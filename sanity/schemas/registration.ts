import { defineField, defineType } from "sanity"

export default defineType({
  name: "registration",
  title: "Registration",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "affiliation",
      title: "Affiliation",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Student", value: "student" },
          { title: "Academic", value: "academic" },
          { title: "Industry Professional", value: "industry" },
          { title: "Government", value: "government" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "dietaryRequirements",
      title: "Dietary Requirements",
      type: "string",
    }),
    defineField({
      name: "attendingDinner",
      title: "Attending Conference Dinner",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "abstract",
      title: "Abstract Submission",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Registration Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "lastName",
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
})
