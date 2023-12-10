import * as yup from "yup";

export const addInviteeSchema = yup.object().shape({
  itsId: yup.number().required(),
  name: yup.string().required(),
  file_no: yup.number().required(),
  sector: yup.string().required()
});

export const editVisitStatusSchema = yup.object().shape({
  itsId: yup.number().required(),
  will_attend: yup.boolean().required(),
  has_filled_response: yup.boolean()
});

export const bulkEditVisitStatusSchema = yup.array().of(
  yup.object().shape({
    itsId: yup.number().required(),
    fields: yup.object().shape({
      will_attend: yup.boolean().required(),
      has_filled_response: yup.boolean().required()
    })
  })
);
