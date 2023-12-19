USE bd2_practica2;

LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\EntradaPrac1\\Pacientes.csv"
INTO TABLE paciente 
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(idPaciente,edad,genero);