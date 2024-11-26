import VoteModel from "../models/voteModel.js";

// add vote
const addVote = async (req, res) => {
    const { studentId, 
        voterNumber, 
        president,
        vicePresident,
        secretaryGeneral,
        assistantSecretaryGeneral,
        financialSecretary,
        treasurer,
        directorOfSocials,
        directorOfGames,
        directorOfWelfare,
        publicRelationOfficer } = req.body;
    try {
        const existingVote = await VoteModel.findOne({ studentId });
        if (existingVote) {
            return res.status(202).json({ message: 'Student has already voted.' })
        }
        const vote = await VoteModel.create({ 
            studentId, 
            voterNumber, 
            president,
            vicePresident,
            secretaryGeneral,
            assistantSecretaryGeneral,
            financialSecretary,
            treasurer,
            directorOfSocials,
            directorOfGames,
            directorOfWelfare,
            publicRelationOfficer, })
        if (vote) {
            res.status(201).json(vote);
        }
    } catch (error) {
        console.error('Something went wrong while adding vote. ', error)
        res.status(500).json({ message: 'Something went wrong while adding vote.' })
    }
}

//fetch votes
const fetchVotes = async (req, res) => {
    try {
        const votes = await VoteModel.find();
        if (!votes) {
            return res.status(404).json({ message: 'There are no votes casted.' });
        }
        res.status(200).json(votes);
    } catch (error) {
        console.error('Something went wrong while fetching votes. ', error);
        res.status(500).json({ message: 'Something went wrong while fetching votes.' });
    }
}

//edit vote
const editVote = async (req, res) => {
    const id = req.params.id
    try {
        const vote = await VoteModel.findOneAndUpdate({studentId: id}, req.body);
        if (!vote) {
            return res.status(404).json({ message: 'Student vote not found.' })
        }
        res.status(200).json({ message: `${vote.voterNumber}'s vote updated successfully.` })
    } catch (error) {
        console.error('Something went wrong (back). ', error);
        res.status(500).json({ message: "Something went wrong while updating this student's vote (back 500)" })
    }
}

//delete student's vote
const deleteVote = async (req, res) => {
    const id = req.params.id
    try {
        const vote = await VoteModel.deleteMany({studentId: id});
        if (!vote) {
            return res.status(404).json({ message: "Student's votes note found" })
        }
        res.status(200).json({ message: `${vote.voterNumber}'s vote deleted successfully.` })
    } catch (error) {
        console.error('Something went wrong (back). ', error);
        res.status(500).json({ message: "Something went wrong while deleting this student's vote (back 500)" })
    }
}


export { addVote, fetchVotes, editVote, deleteVote };