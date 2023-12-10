import { VISIT_STATUS } from "@/appConstants";
import * as yup from "yup";

export const addHouseSchema = yup.object().shape({
  itsId: yup.string().required(),
  hof_id: yup.string(),
  tanzeem_file_no: yup.string(),
  address: yup.string().required(),
  full_name: yup.string().required(),
  contact: yup.string(),
  sector: yup.string().required(),
  sub_sector: yup.string().required(),
  added_by_name: yup.string().required(),
  added_by_contact: yup.string()
});

export const editVisitStatusSchema = yup.object().shape({
  status: yup.string().required().oneOf(Object.values(VISIT_STATUS)),
  comments: yup.string(),
  visited_by_name: yup.string().required(),
  visited_by_contact: yup.string(),
  visit_date: yup.date().required()
});

export const bulkEditVisitStatusSchema = yup.array().of(
  yup.object().shape({
    _id: yup.string().required(),
    fields: yup
      .object()
      .shape({
        status: yup.string().required().oneOf(Object.values(VISIT_STATUS)),
        comments: yup.string(),
        visited_by_name: yup.string(),
        visited_by_contact: yup.string(),
        visit_date: yup.date()
      })
      .required()
  })
);
