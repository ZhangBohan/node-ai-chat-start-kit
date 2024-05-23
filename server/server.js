// Import the framework and instantiate it
import Fastify from 'fastify'

import OpenAI from "openai/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
    baseURL: process.env.BASE_URL

});


const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.post('/', async function handler (request, reply) {
  console.log('request.body', request.body)
  const chatCompletion = await openai.chat.completions.create({
    messages: request.body.messages,
    model: 'gpt-3.5-turbo',
  });
  console.log('chatCompletion', chatCompletion)
  return {
    content: chatCompletion.choices[0].message.content
  }
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
