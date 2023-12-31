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
        <div className="container">
          <h1 className="col-sm-12 col-md-8 col-lg-8 titulo-formulario">Ingresá tu salario neto y descubrí en qué parte de la pirámide de social estás</h1>
        <form className="col-sm-12 col-md-8 col-lg-8" onSubmit={onSubmit}>
          <label htmlFor="salary"></label>
          <input
          className="form-control"
          placeholder="Ingresá tu salario neto"
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

          <button className="btn btn-success" type="submit">Calcular</button>
        </form>
        </div>
      )}

      {isShownSalary && (
        <div className="col-12">
          <h1>La pirámide social de la argentina en el 2023</h1>
          <h2>El ingreso promedio total del país en hogares es de $340.000 mensuales</h2>
          <img
            className="img-fluid"
            src={
              watch("salary") < 191000
                ? images[0].picture
                : watch("salary") > 190001 && watch("salary") < 249999
                ? images[1].picture
                : watch("salary") > 250000 && watch("salary") < 449999
                ? images[2].picture
                : watch("salary") > 450000 && watch("salary") < 899999
                ? images[3].picture
                : images[4].picture
            }
          />
          <div>
            <p>Fuente: Consultora W sobre la base de datos EPH - Nivel socioecoómico SAIMO/CIEM - Martín</p>
            <button className="btn btn-success" onClick={handleReset}>
              Calcular de nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
