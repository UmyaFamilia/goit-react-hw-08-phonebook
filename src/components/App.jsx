import { ContactList } from './ContactList/ContactLIst';

import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';

export function App() {
  return (
    <div className="container">
      <Form />
      <Filter />
      <ContactList />
      {/* {isLoading ? <p>is Loading...</p> : } */}
    </div>
  );
}
