import express from 'express';
import { addVote, deleteVote, editVote, fetchVotes } from '../controllers/voteController.js';

const voteRouter = express.Router();

voteRouter.post('/addVote', addVote)
voteRouter.get('/fetchVotes', fetchVotes)
voteRouter.patch('/editVote/:id', editVote);
voteRouter.delete('/deleteVote/:id', deleteVote);

export default voteRouter;