import pacientes from "../db/models/paciente.model.js";
import habitaciones from "../db/models/habitacion.model.js";
import logActividades from "../db/models/logActividades.model.js";

export const query1 = async (req, res) => {

    try {
        const result = await pacientes.aggregate([
            {
                $project: {
                    edades: {
                        $cond: {
                            if: {
                                $and: [
                                    {$gte: ["$edad", 0]},
                                    {$lte: ["$edad", 17]}
                                ]
                            },
                            then: "pediatrico",
                            else: {
                                $cond: {
                                    if: {
                                        $and: [
                                            {$gte: ["$edad", 18]},
                                            {$lte: ["$edad", 64]}
                                        ]
                                    },
                                    then: "mediana",
                                    else: "geriatrico"
                                }
                            }
                        }
                    },
                    value: 1
                }
            },
            {
                $group: {
                    _id: "$edades",
                    pacientes: {$sum: 1}
                }
            }
        ]);

        res.response(result, 'Query 1', 200);

    } catch (error) {
      console.log(error);
      res.response(null, error.message, 400);
    }
}

export const query2 = async (req, res) => {
  
  try {

      const result = await logActividades.aggregate([
          {
              $lookup: {
                  from: "habitaciones",
                  localField: "idHabitacion",
                  foreignField: "idHabitacion",
                  as: "habitacion"
              }
          },
          {
              $group: {
                  _id: {
                      idHabitacion: "$idHabitacion",
                      habitacion: "$habitacion.habitacion"
                  },
                  count: {$sum: 1}
              }
          }
      ]);

      res.response(result, 'Query 2', 200);

  }
  catch (error) {
      console.log(error);
      res.response(null, error.message, 400);
  }
}

export const query3 = async (req, res) => {

    try {
        const result = await pacientes.aggregate([
            {
                $group: {
                    _id: "$genero",
                    pacientes: {$sum: 1}
                }
            }
        ]);

        res.response(result, 'Query 3', 200);

    } catch (error) {
      console.log(error);
      res.response(null, error.message, 400);
    }
}

export const query4 = async (req, res) => {

    try {
        const result = await pacientes.aggregate([
            {
                $group: {
                    _id: "$edad",
                    count: {$sum: 1}
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 5
            }
        ]);

        res.response(result, 'Query 4', 200);

    } catch (error) {
      console.log(error);
      res.response(null, error.message, 400);
    }
}

export const query5 = async (req, res) => {

  try {
      const result = await pacientes.aggregate([
          {
              $group: {
                  _id: "$edad",
                  count: {$sum: 1}
              }
          },
          {
              $sort: {
                  count: 1
              }
          },
          {
              $limit: 5
          }
      ]);

      res.response(result, 'Query 5', 200);

  }
  catch (error) {
      console.log(error);
      res.response(null, error.message, 400);
  }
}

// fusionar todas las querys en una sola respuesta
export const querys = async (req, res) => {

  try {
      const result1 = await pacientes.aggregate([
          {
              $project: {
                  edades: {
                      $cond: {
                          if: {
                              $and: [
                                  {$gte: ["$edad", 0]},
                                  {$lte: ["$edad", 17]}
                              ]
                          },
                          then: "pediatrico",
                          else: {
                              $cond: {
                                  if: {
                                      $and: [
                                          {$gte: ["$edad", 18]},
                                          {$lte: ["$edad", 64]}
                                      ]
                                  },
                                  then: "mediana",
                                  else: "geriatrico"
                              }
                          }
                      }
                  },
                  value: 1
              }
          },
          {
              $group: {
                  _id: "$edades",
                  pacientes: {$sum: 1}
              }
          }
      ]);

      const result2 = await logActividades.aggregate([
          {
              $lookup: {
                  from: "habitaciones",
                  localField: "idHabitacion",
                  foreignField: "idHabitacion",
                  as: "habitacion"
              }
          },
          {
              $group: {
                  _id: {
                      idHabitacion: "$idHabitacion",
                      habitacion: "$habitacion.habitacion"
                  },
                  count: {$sum: 1}
              }
          }
      ]);

      const result3 = await pacientes.aggregate([
          {
              $group: {
                  _id: "$genero",
                  pacientes: {$sum: 1}
              }
          }
      ]);

      const result4 = await pacientes.aggregate([
          {
              $group: {
                  _id: "$edad",
                  count: {$sum: 1}
              }
          },
          {
              $sort: {
                  count: -1
              }
          },
          {
              $limit: 5
          }
      ]);

      const result5 = await pacientes.aggregate([
          {
              $group: {
                  _id: "$edad",
                  count: {$sum: 1}
              }
          },
          {
              $sort: {
                  count: 1
              }
          },
          {
              $limit: 5
          }
      ]);

      res.response({
          query1: result1,
          query2: result2,
          query3: result3,
          query4: result4,
          query5: result5
      }, 'Querys', 200);

  }
  catch (error) {
      console.log(error);
      res.response(null, error.message, 400);
  }
}