import mongoose from 'mongoose'

const WordSchema = new mongoose.Schema({
  word: String,
  definitions: [
    {
      definition: String,
      partOfSpeech: String,
      examples: [String],
      synonyms: [String],
      antonyms: [String],
      coiner: String,
      year: Number,
    },
  ],
  idiom: Boolean,
  phoneticNotation: String,
  createdAt: Date,
  uid: String || Number
})

export default mongoose.models.Word || mongoose.model('Word', WordSchema)
