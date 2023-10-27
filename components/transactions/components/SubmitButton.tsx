import { useEffect, useState } from "react";
import { Button, Form, FormInstance } from "antd";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values, form]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Transfer now
    </Button>
  );
};

export default SubmitButton;