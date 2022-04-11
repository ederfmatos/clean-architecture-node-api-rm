import { components } from './components'
import { paths } from './paths'
import { schemas } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso do Rodrigo Manguinho para realizar enquetes entre programadores',
    version: '1.0.0',
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [
    { url: '/api' }
  ],
  tags: [
    { name: 'Auth' },
    { name: 'Enquetes' }
  ],
  paths,
  schemas,
  components
}

console.log(JSON.stringify(components, null, 2))
