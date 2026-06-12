import express from 'express';
import { generateAssignment } from '../controllers/aiController.js';

const rounter = express();

rounter.post( "/generate-assignment", generateAssignment)

export default rounter;