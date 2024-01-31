
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
export default function Profile() {
  return (
    <div className="profile-page container">
      <h2>Welcome to the Forge, Frank!</h2>
      <h3>About You</h3>
      <div className="profile-container">
         <div className="profile-container-item">
            <div className="profile-container-element">
              <label>Avatar*</label>
              <img src="/images/upload.png" />
            </div>
         </div>
         <div className="profile-container-item">
            <div className="profile-container-element">
               <label>First Name or Alias*</label>
               <Form.Control type="text" placeholder="Enter First Name or Alias" />
               <span>Up to 50 characters, can have spaces.</span>
            </div>
            <div className="profile-container-element">
               <label>Last Name</label>
               <Form.Control type="text" placeholder="Enter Last Name" />
               <span>15 characters</span>
            </div>
            <div className="profile-container-element">
               <label>Username*</label>
               <Form.Control type="text" placeholder="Enter Username" />
               <span>15 characters</span>
            </div>
            <div className="profile-container-element">
               <label>Pronouns*</label>
               <Form.Select>
                 <option value="They/them">They/them</option>
                 <option value="He/him">He/him</option>
                 <option value="She/her">She/her</option>
               </Form.Select>
               <span>15 characters</span>
            </div>
         </div>
         <div className="profile-container-item">
            <div className="profile-container-element">
              <label>Description</label>
              <Form.Control as="textarea" rows={13} placeholder='Tell us about yourself in up to 160 characters.'/>
            </div>
            <div className="profile-container-element">
               <label>Superhero Identity</label>
                <div className='profile-container-element-group'>
                    <div className='profile-container-element-group-item'>
                    <div className='profile-container-element-group-item-left'>
                       <Form.Control type="text" placeholder="Descriptor" />
                       <span>Example: Amazing</span>
                    </div>
                    </div>
                    <div className='profile-container-element-group-item'>
                    <div className='profile-container-element-group-item-right'>
                       <Form.Control type="text" placeholder="Noun" />
                       <span>Example: Elf</span>
                    </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
      <div className='profile-container-action'>
      <Button variant="primary" size='lg'>
        Mint Your Profile
      </Button>
      <div className='price-details'>
        <p>Price: 1.000 MMOSH</p>
        <label>plus a small amount of SOL for gas fees</label>
      </div>
      <div className='balance-details'>
        <p>Current Balance: 1.000 MMOSH</p>
        <p>Current Balance: 1.000 SOL</p>
      </div>
      </div>
    </div>
  );
}
