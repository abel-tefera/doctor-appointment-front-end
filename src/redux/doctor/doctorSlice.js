import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../constants';

const initialState = {
  doctors: [],
  error: null,
  status: 'not started',
};

export const fetchAllDoctors = createAsyncThunk(
  'GET DOCTORS',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/doctors`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Doctors not found');
    }
  },
);

export const removeDoctor = createAsyncThunk(
  'REMOVE_DOCTOR',
  async (doctorId) => {
    await axios.delete(`${BASE_URL}/doctors/${doctorId}`);
  },
);

export const addNewDoctor = createAction('doctor/addNewDoctor');

export const doctorsCreateThunk = createAsyncThunk(
  'doctor/create',
  async (doctor, { rejectWithValue, dispatch }) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const URL = `${BASE_URL}/doctors/`;
    try {
      const response = await axios.post(URL, doctor, { headers });
      dispatch(addNewDoctor(response.data));
      return response;
    } catch (error) {
      return rejectWithValue('Cannot create doctor');
    }
  },
);

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    deleteDoctorById: (state, action) => {
      const doctorId = action.payload;
      state.doctors = state.doctors.filter((doctor) => doctor.id !== doctorId);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addNewDoctor, (state, action) => {
        state.doctors = [...state.doctors, action.payload];
      });
  },
});

export const doctorsFetchStatus = (state) => state.doctor.status;
export const getDoctors = (state) => state.doctor.doctors;
export const { deleteDoctorById } = doctorSlice.actions;

export default doctorSlice.reducer;
