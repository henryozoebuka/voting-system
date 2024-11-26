import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
    studentId: {
        type: String,
        required: true,
    },

    voterNumber: {
        type: Number,
        required: true,
    },

    president: {
        type: String,
    },

    vicePresident: {
        type: String,
    },

    secretaryGeneral: {
        type: String,
    },

    assistantSecretaryGeneral: {
        type: String,
    },

    financialSecretary: {
        type: String,
    },

    treasurer: {
        type: String,
    },

    directorOfSocials: {
        type: String,
    },

    directorOfGames: {
        type: String,
    },

    directorOfWelfare: {
        type: String,
    },

    publicRelationOfficer: {
        type: String,
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    }
});

const VoteModel = mongoose.model('Vote', voteSchema);
export default VoteModel;