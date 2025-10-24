// src/components/devtools/devtools-loader.tsx
import * as React from 'react'

export function DevtoolsLoader() {
  const [ui, setUi] = React.useState<React.ReactNode>(null)

  // if (!import.meta.env.DEV) return null

  React.useEffect(() => {
    let mounted = true

    Promise.all([
      import('@tanstack/react-devtools'),
      import('@tanstack/react-router-devtools'),
      import('@tanstack/react-query-devtools'),
    ]).then(
      ([
        { TanStackDevtools },
        { TanStackRouterDevtoolsPanel },
        { ReactQueryDevtoolsPanel },
      ]) => {
        if (!mounted) return
        setUi(
          <TanStackDevtools
            config={{ position: 'bottom-left' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              { name: 'Tanstack Query', render: <ReactQueryDevtoolsPanel /> },
            ]}
          />,
        )
      },
    )

    return () => {
      mounted = false
    }
  }, [])

  return ui
}

export default DevtoolsLoader

/* 
I could also add the devtools in the root route like this:
				<Fragment>
					{import.meta.env.DEV ? (
						<TanstackDevtools
							config={{
								position: "bottom-left",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
								TanStackQueryDevtools,
							]}
						/>
					) : null}
				</Fragment>
*/
