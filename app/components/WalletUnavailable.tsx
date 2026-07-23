export default function WalletUnavailable() {
  return (
    <div className="portal-card">
      <div className="portal-card-heading">
        <span className="portal-status portal-status-muted">
          Configuration required
        </span>
        <h2>Secure wallet access is being activated.</h2>
        <p>
          The portal interface is live, but wallet connections remain disabled
          until the official WalletConnect project is linked to this domain.
        </p>
      </div>
      <div className="portal-security-note">
        <span aria-hidden="true">✓</span>
        <p>
          Do not connect through unofficial links. Active access will appear
          only on www.xqntcoin.com.
        </p>
      </div>
    </div>
  );
}
