import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
const { v4: uuidv4 } = require('uuid');
import client from "../shared/cosmosClient";

export async function submitForm(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const body = await request.json() as { formId: string, userId: string, [key: string]: any };
    context.log(`Received body: ${JSON.stringify(body)}`);
    if (!body.formId) {
        return { status: 400, body: `formId is required` };
    }
    if (!body.userId) {
        return { status: 400, body: `userId is required` };
    }
    await client.database(process.env.COSMOS_DB_DATABASE).container(process.env.COSMOS_DB_CONTAINER)
        .items.create({
            submissionId: uuidv4(),
            ...body
        });
    
    return { status: 200, body: `Form submitted!` };
};

app.http('submitForm', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: submitForm
});
