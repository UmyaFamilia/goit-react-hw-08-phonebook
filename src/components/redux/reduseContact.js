import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const responce = await fetch(
        'https://656b900edac3630cf7283912.mockapi.io/contacts/contacts'
      );
      if (!responce.ok) {
        throw new Error('server error');
      }

      const data = await responce.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, { dispatch, rejectWithValue }) => {
    try {
      const responce = await fetch(
        'https://656b900edac3630cf7283912.mockapi.io/contacts/contacts',
        {
          method: 'POST',
          body: JSON.stringify({
            name,
            number,
          }),
          headers: { 'content-type': 'application/json' },
        }
      );
      if (!responce.ok) {
        throw new Error('server error');
      }
      const data = await responce.json();

      dispatch(addContactsToArray({ name, number, id: data.id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const responce = await fetch(
        `https://656b900edac3630cf7283912.mockapi.io/contacts/contacts/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!responce.ok) {
        throw new Error("'server error'");
      }
      dispatch(removeContactFromArray(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.contacts.error = action.payload;
};

const contactReducer = createSlice({
  name: 'addgetContact',

  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    addContactsToArray(state, action) {
      state.contacts.items.push(action.payload);
    },
    removeContactFromArray(state, action) {
      state.contacts.items = state.contacts.items.filter(
        a => a.id !== action.payload
      );
    },
    findNecessary(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.contacts.isLoading = true;
    },
    [addContact.pending]: state => {
      state.contacts.isLoading = true;
    },
    [deleteContact.pending]: state => {
      state.contacts.isLoading = true;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items = action.payload;
    },
    [addContact.fulfilled]: state => {
      state.contacts.isLoading = false;
    },
    [deleteContact.fulfilled]: state => {
      state.contacts.isLoading = false;
    },

    [fetchContacts.rejected]: setError,
    [addContact.rejected]: setError,
    [deleteContact.rejected]: setError,
  },
});

export const addgetContact = contactReducer.reducer;
export const { addContactsToArray, removeContactFromArray, findNecessary } =
  contactReducer.actions;
