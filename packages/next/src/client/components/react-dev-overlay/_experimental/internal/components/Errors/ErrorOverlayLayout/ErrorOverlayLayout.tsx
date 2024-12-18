import type { VersionInfo } from '../../../../../../../../server/dev/parse-version-info'
import { Dialog, DialogHeader, DialogBody, DialogContent } from '../../Dialog'
import { Overlay } from '../../Overlay'
import { VersionStalenessInfo } from '../../VersionStalenessInfo'

type ErrorOverlayLayoutProps = {
  errorMessage: string | React.ReactNode
  errorType:
    | 'Build Error'
    | 'Runtime Error'
    | 'Console Error'
    | 'Unhandled Runtime Error'
    | 'Missing Required HTML Tag'
  children?: React.ReactNode
  errorCode?: string
  isBuildError?: boolean
  onClose?: () => void
  // TODO: remove this
  temporaryHeaderChildren?: React.ReactNode
  versionInfo?: VersionInfo
}

export function ErrorOverlayLayout({
  errorMessage,
  errorType,
  children,
  errorCode,
  isBuildError,
  onClose,
  temporaryHeaderChildren,
  versionInfo,
}: ErrorOverlayLayoutProps) {
  return (
    <Overlay fixed={isBuildError}>
      <Dialog
        type="error"
        aria-labelledby="nextjs__container_errors_label"
        aria-describedby="nextjs__container_errors_desc"
        onClose={onClose}
      >
        <DialogContent>
          <DialogHeader className="nextjs-container-errors-header">
            <div
              className="nextjs__container_errors__error_title"
              // allow assertion in tests before error rating is implemented
              data-nextjs-error-code={errorCode}
            >
              <h1
                id="nextjs__container_errors_label"
                className="nextjs__container_errors_label"
              >
                {errorType}
              </h1>
            </div>
            <VersionStalenessInfo versionInfo={versionInfo} />
            <p
              id="nextjs__container_errors_desc"
              className="nextjs__container_errors_desc"
            >
              {errorMessage}
            </p>
            {temporaryHeaderChildren}
          </DialogHeader>
          <DialogBody className="nextjs-container-errors-body">
            {children}
          </DialogBody>
        </DialogContent>
      </Dialog>
    </Overlay>
  )
}
