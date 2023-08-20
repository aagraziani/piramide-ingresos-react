import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { images as photos } from "../data/images";

export function SalaryForm({ getSalary }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const [isShownForm, setIsShownForm] = useState(true);
  const [isShownSalary, setIsShownSalary] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(photos);
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setIsShownForm((current) => !current);
    setIsShownSalary((current) => !current);
  });

  const handleReset = (e) => {
    setIsShownForm((current) => !current);
    reset();
    setIsShownSalary((current) => !current);
  };

  return (
    <div>
      {isShownForm && (
        <form onSubmit={onSubmit}>
          <label htmlFor="salary"></label>
          <input
          className="form-control"
          placeholder="Ingresá tu salario bruto"
            type="text"
            {...register("salary", {
              required: {
                value: true,
                message: "Por favor ingresá un salario para continuar.",
              },
              validate: (value) => {
                if(isNaN(value)) {
                    return "El valor debe ser un número";
                } else {
                    return true;
                }
              }
            })}
          />

          {errors.salary && <span>{errors.salary.message}</span>}

          <button className="btn btn-success" type="submit">Enviar</button>
        </form>
      )}

      {isShownSalary && (
        <div className="col-12">
          <img
            className="img-fluid"
            src={
              watch("salary") < 90000
                ? images[0].picture
                : watch("salary") > 90001 && watch("salary") < 119999
                ? images[1].picture
                : watch("salary") > 120000 && watch("salary") < 249999
                ? images[2].picture
                : watch("salary") > 250000 && watch("salary") < 449999
                ? images[3].picture
                : images[4].picture
            }
          />
          <div>
            <button className="btn btn-success" onClick={handleReset}>
              Calcular de nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
