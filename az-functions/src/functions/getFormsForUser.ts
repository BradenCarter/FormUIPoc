import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
const { v4: uuidv4 } = require('uuid');
import client from "../shared/cosmosClient";

export async function getFormsForUser(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const submissions = await client.database(process.env.COSMOS_DB_DATABASE).container(process.env.COSMOS_DB_CONTAINER)
        .items.query({
            query: "SELECT * from c WHERE c.userId = @userId",
            parameters: [{ name: "@userId", value: request.query.get('userId') }]
        }).fetchAll();
    return { status: 200, body: JSON.stringify(submissions.resources) };
};

app.http('getFormsForUser', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getFormsForUser
});
