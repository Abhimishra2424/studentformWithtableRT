import React from "react";
import { Button, Container, Grid, Input } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const EditStudent = ({ row, onSave }) => {
  const { originalRow, rowIndex } = row;
  return (
    <Container>
      <Formik
        initialValues={{
          firstName: originalRow.firstName ? originalRow.firstName : "",
          lastName: originalRow.lastName ? originalRow.lastName : "",
          email: originalRow.email ? originalRow.email : "",
          phone: originalRow.phone ? originalRow.phone : "",
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          phone: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSave(values, rowIndex);
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
            <Grid columns="one">
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
            <Grid columns="one">
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
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  fluid
                  color="blue"
                  content="Submit"
                />
              </Grid.Column>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditStudent;
