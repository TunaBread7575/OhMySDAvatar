export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    const discordPath = url.pathname;
    const discordUrl = `https://discord.com/api/v10${discordPath}`;

    const modifiedRequest = new Request(discordUrl, {
      method: request.method,
      headers: {
        "Authorization": request.headers.get("Authorization"),
        "Content-Type": "application/json",
        "User-Agent": "DiscordBot (https://github.com/discord/discord-api-docs, 1.0.0)"
      },
      body: request.body
    });

    try {
      const response = await fetch(modifiedRequest);
      return new Response(response.body, {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }
};