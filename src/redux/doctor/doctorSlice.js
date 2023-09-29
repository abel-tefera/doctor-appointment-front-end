import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../constants';

const initialState = {
  doctors: null,
  error: null,
  appointmentDoctor: null,
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

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    deleteDoctorById: (state, action) => {
      const doctorId = action.payload;
      state.doctors = state.doctors.filter((doctor) => doctor.id !== doctorId);
    },
    setClickedDoctor: (state, action) => {
      state.appointmentDoctor = state.doctors.find(({ id }) => id === action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const doctorsFetchStatus = (state) => state.doctor.status;
export const getDoctors = (state) => state.doctor.doctors;

export const { deleteDoctorById, setClickedDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;
