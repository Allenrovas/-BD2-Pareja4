USE bd2_practica1;

LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\EntradaPrac1\\LogHabitacion.csv"
INTO TABLE log_habitacion 
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(idHabitacion,timestampx,statusx);