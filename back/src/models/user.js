const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    tasks: {
      type: [
        {
          title: {
            type: String,
            required: true
          },
          done: {
            type: Schema.Types.Boolean,
            default: false,
          },
          tag: {
            type: String,
            default: "",
          },
          description: {
            type: String,
            default: "",
          },
          priority: {
            type: Number,
            enum: [1, 2, 3],
            default: 2,
          },
        }
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)
module.exports = model("User", UserSchema)
