USE bd2_practica2;

LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\EntradaPrac1\\LogActividades1.csv"
INTO TABLE log_actividad 
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(timestampx,actividad,idHabitacion,idPaciente);