import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/get-all-products.getProductsList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true
      }
    }
  ]
}
