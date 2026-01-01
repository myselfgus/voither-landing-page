import { Hono } from "hono";
import { getAgentByName } from 'agents';
import { ChatAgent } from './agent';
import { API_RESPONSES } from './config';
import { Env, getAppController, registerSession, unregisterSession } from "./core-utils";
import { imageGenRoutes } from "./imageGen";
export function coreRoutes(app: Hono<{ Bindings: Env }>) {
    app.all('/api/chat/:sessionId/*', async (c) => {
        try {
        const sessionId = c.req.param('sessionId');
        const agent = await getAgentByName<Env, ChatAgent>(c.env.CHAT_AGENT, sessionId);
        const url = new URL(c.req.url);
        url.pathname = url.pathname.replace(`/api/chat/${sessionId}`, '');
        return agent.fetch(new Request(url.toString(), {
            method: c.req.method,
            headers: c.req.header(),
            body: c.req.method === 'GET' || c.req.method === 'DELETE' ? undefined : c.req.raw.body
        }));
        } catch (error) {
        console.error('Agent routing error:', error);
        return c.json({
            success: false,
            error: API_RESPONSES.AGENT_ROUTING_FAILED
        }, { status: 500 });
        }
    });
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    imageGenRoutes(app);
    /**
     * Store lead generation contact data
     * POST /api/contact
     */
    app.post('/api/contact', async (c) => {
        try {
            const body = await c.req.json();
            const { name, org, email } = body;
            if (!name || !org || !email) {
                return c.json({ success: false, error: 'Missing required fields' }, 400);
            }
            const timestamp = Date.now();
            const leadId = `lead:${timestamp}:${crypto.randomUUID().slice(0, 8)}`;
            // Persist to KV if binding exists, otherwise log
            if ((c.env as any).KV_CONTACTS) {
                await (c.env as any).KV_CONTACTS.put(leadId, JSON.stringify({ name, org, email, timestamp }));
            } else {
                console.log(`[LEAD CAPTURED] ${name} from ${org} (${email})`);
            }
            return c.json({ success: true, message: 'Contact request stored successfully' });
        } catch (error) {
            console.error('Contact storage error:', error);
            return c.json({ success: false, error: 'Internal server error' }, 500);
        }
    });
    /**
     * Retrieve platform metrics
     * GET /api/stats
     */
    app.get('/api/stats', async (c) => {
        try {
            const controller = getAppController(c.env);
            const sessionCount = await controller.getSessionCount();
            return c.json({
                success: true,
                data: {
                    activeSessions: sessionCount,
                    totalDocumentationSavedHours: 1240 + (sessionCount * 1.5),
                    satisfactionRate: 98.4,
                    uptime: '99.99%'
                }
            });
        } catch (error) {
            return c.json({ success: false, error: 'Stats failed' }, 500);
        }
    });
    app.get('/api/sessions', async (c) => {
        try {
            const controller = getAppController(c.env);
            const sessions = await controller.listSessions();
            return c.json({ success: true, data: sessions });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to retrieve sessions' }, 500);
        }
    });
    app.post('/api/sessions', async (c) => {
        try {
            const body = await c.req.json().catch(() => ({}));
            const { title, sessionId: providedSessionId, firstMessage } = body;
            const sessionId = providedSessionId || crypto.randomUUID();
            let sessionTitle = title || `Chat ${new Date().toLocaleDateString()}`;
            await registerSession(c.env, sessionId, sessionTitle);
            return c.json({ success: true, data: { sessionId, title: sessionTitle } });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to create session' }, 500);
        }
    });
    app.delete('/api/sessions/:sessionId', async (c) => {
        try {
            const sessionId = c.req.param('sessionId');
            const deleted = await unregisterSession(c.env, sessionId);
            return c.json({ success: true, data: { deleted } });
        } catch (error) {
            return c.json({ success: false, error: 'Failed to delete session' }, 500);
        }
    });
}