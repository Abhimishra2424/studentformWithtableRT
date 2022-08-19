import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Grid, Input } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../context/appContext";

const StudentForm = () => {
  const navigate = useNavigate();
  const { getStudent } = useAppContext();
  const { id } = useParams();

  const [found, setFound] = useState(null);

  const getStudenttable = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:5000/api/student/${id ? id : ""}`
    );
    setFound(response?.data);
  }, [id]);

  useEffect(() => {
    getStudenttable();
  }, [getStudenttable]);

  if (!found) {
    return null;
  }

  console.log("found", found);

  const createStudent = async (values) => {
    const res = await axios.post("http://localhost:5000/api/student", values);
    if (res.data) {
      getStudent();
      navigate("/student");
    }
  };

  const updateStudent = async (values) => {
    const { id } = values;
    const res = await axios.put(`http://localhost:5000/api/student/${id}`, {values});
    if (res.data) {
      getStudent();
      navigate("/student");
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{
          firstName: found?.firstName ? found?.firstName : "",
          lastName: found?.lastName ? found?.lastName : "",
          email: found?.email ? found?.email : "",
          phone: found?.phone ? found?.phone : "",
          address: found?.address ? found?.address : "",
          city: found?.city ? found?.city : "",
          state: found?.state ? found?.state : "",
          zip: found?.zip ? found?.zip : "",
          country: found?.country ? found?.country : "",
          id: found?.id ? found?.id : "",
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          phone: Yup.string().required("Required"),
          address: Yup.string().required("Required"),
          city: Yup.string().required("Required"),
          state: Yup.string().required("Required"),
          zip: Yup.string().required("Required"),
          country: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("values", values);
          setSubmitting(true);
          if (values.id) {
            updateStudent(values);
          } else {
            createStudent(values);
          }

          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          isSubmitting,
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            <Grid columns="two">
              <Grid.Column>
                <Input
                  placeholder="First Name"
                  name="firstName"
                  label="First Name"
                  labelPosition="right"
                  fluid
                  error={touched.firstName && errors.firstName}
                  type="text"
                  value={values.firstName ? values.firstName : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName ? (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.firstName}
                  </div>
                ) : null}
              </Grid.Column>
              <Grid.Column>
                <Input
                  placeholder="Last Name"
                  name="lastName"
                  label="Last Name"
                  labelPosition="right"
                  fluid
                  error={touched.lastName && errors.lastName}
                  type="text"
                  value={values.lastName ? values.lastName : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName ? (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.lastName}
                  </div>
                ) : null}
              </Grid.Column>
            </Grid>
            <Grid columns="two">
              <Grid.Column>
                <Input
                  placeholder="Email"
                  name="email"
                  label="Email"
                  labelPosition="right"
                  fluid
                  error={touched.email && errors.email}
                  type="text"
                  value={values.email ? values.email : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.email}
                  </div>
                ) : null}
              </Grid.Column>
              <Grid.Column>
                <Input
                  placeholder="Phone"
                  name="phone"
                  label="Phone"
                  labelPosition="right"
                  fluid
                  error={touched.phone && errors.phone}
                  type="text"
                  value={values.phone ? values.phone : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone ? (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.phone}
                  </div>
                ) : null}
              </Grid.Column>
            </Grid>
            <Grid columns="two">
              <Grid.Column>
                <Input
                  placeholder="Address"
                  name="address"
                  label="Address"
                  labelPosition="right"
                  fluid
                  error={touched.address && errors.address}
                  type="text"
                  value={values.address ? values.address : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address ? (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.address}
                  </div>
                ) : null}
              </Grid.Column>
              <Grid.Column>
                <Input
                  placeholder="City"
                  name="city"
                  label="City"
                  labelPosition="right"
                  fluid
                  error={touched.city && errors.city}
                  type="text"
                  value={values.city ? values.city : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.city && touched.city ? (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.city}
                  </div>
                ) : null}
              </Grid.Column>
            </Grid>
            <Grid columns="two">
              <Grid.Column>
                <Input
                  placeholder="State"
                  name="state"
                  label="State"
                  labelPosition="right"
                  fluid
                  error={touched.state && errors.state}
                  type="text"
                  value={values.state ? values.state : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.state && touched.state ? (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.state}
                  </div>
                ) : null}
              </Grid.Column>
              <Grid.Column>
                <Input
                  placeholder="Zip"
                  name="zip"
                  label="Zip"
                  labelPosition="right"
                  fluid
                  error={touched.zip && errors.zip}
                  type="text"
                  value={values.zip ? values.zip : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.zip && touched.zip ? (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.zip}
                  </div>
                ) : null}
              </Grid.Column>
            </Grid>
            <Grid columns="two">
              <Grid.Column>
                <Input
                  placeholder="Country"
                  name="country"
                  label="Country"
                  labelPosition="right"
                  fluid
                  error={touched.country && errors.country}
                  type="text"
                  value={values.country ? values.country : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.country && touched.country ? (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.country}
                  </div>
                ) : null}
              </Grid.Column>
              <Grid.Column>
                <Button primary type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default StudentForm;
