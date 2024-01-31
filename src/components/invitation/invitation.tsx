import { Button } from "react-bootstrap";

export default function Invitation() {
  return (
    <div className="invitation-page">
      
      <h2>Welcome to the Forge, Frank!</h2>
      <div className="invitation-page-inner">
         <div className="invitation-page-inner-image">
            <img src="/images/invite.png" />
         </div>
         <div className="invitation-page-inner-content">
            <h3>Invitation from Frank</h3>
            <p>Frank cordially invites you to join him on Moral Panic, the Genesis MMOSH. The favor of a reply is requested.</p>
            <div className="invitation-content-container">
              <div className="invitation-content-left">
                  <p>
                    <label>Amount:</label>
                    <span className="amount">6</span>
                  </p>
                  <p>
                    <label>Quota:</label>
                    <span>10</span>
                  </p>
                  <p>
                    <label>Unit Cost:</label>
                    <span>1 $MMOSH</span>
                  </p>
              </div>
              <div className="invitation-content-right">
                <Button variant="primary" size='sm'>Mint</Button>
                <p>Price: 6 $MMOSH</p>
                <p className="small">Plus a small SOL transaction fee</p>
                <p>Current Balance: 1000 MMOSH</p>
                <p>Current Balance: 1000 SOL</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
