import * as yup from "yup";

export const addInviteeSchema = yup.object().shape({
  itsId: yup.number().required(),
  name: yup.string().required(),
  file_number: yup.number().required(),
  mobile: yup.string().required(),
  sub_sector: yup.string().required(),
  sector: yup.string().required(),
  enrolled_for_khidmat: yup.string().required().oneOf(["yes", "no"]),
  khidmat_name: yup.string(),
  can_provide_utara: yup.string().required().oneOf(["yes", "no"]),
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
