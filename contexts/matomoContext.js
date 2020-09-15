import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

const instance = createInstance({
  urlBase: 'https://matomo.seniorcareprism.com/',
  siteId: 1
})

export default function MatomoContextProvider(props) {
  return (
    <MatomoProvider value={instance} >
      { props.children }
    </MatomoProvider>
  )
}