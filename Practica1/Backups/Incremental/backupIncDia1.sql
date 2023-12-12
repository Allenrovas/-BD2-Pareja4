# The proper term is pseudo_replica_mode, but we use this compatibility alias
# to make the statement usable on server versions 8.0.24 and older.
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
# at 4
#231212  1:55:30 server id 1  end_log_pos 126 CRC32 0xf6d0a351 	Start: binlog v 4, server v 8.0.34 created 231212  1:55:30
# Warning: this binlog is either in use or was not closed properly.
BINLOG '
8hF4ZQ8BAAAAegAAAH4AAAABAAQAOC4wLjM0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAEwANAAgAAAAABAAEAAAAYgAEGggAAAAICAgCAAAACgoKKioAEjQA
CigAAVGj0PY=
'/*!*/;
# at 126
#231212  1:55:30 server id 1  end_log_pos 157 CRC32 0x14d902d5 	Previous-GTIDs
# [empty]
# at 157
#231212  1:56:53 server id 1  end_log_pos 236 CRC32 0x0f763715 	Anonymous_GTID	last_committed=0	sequence_number=1	rbr_only=yes	original_committed_timestamp=1702367813431462	immediate_commit_timestamp=1702367813431462	transaction_length=711
/*!50718 SET TRANSACTION ISOLATION LEVEL READ COMMITTED*//*!*/;
# original_commit_timestamp=1702367813431462 (2023-12-12 01:56:53.431462 Hora estándar, América Central)
# immediate_commit_timestamp=1702367813431462 (2023-12-12 01:56:53.431462 Hora estándar, América Central)
/*!80001 SET @@session.original_commit_timestamp=1702367813431462*//*!*/;
/*!80014 SET @@session.original_server_version=80034*//*!*/;
/*!80014 SET @@session.immediate_server_version=80034*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 236
#231212  1:56:53 server id 1  end_log_pos 322 CRC32 0x5c3e9f49 	Query	thread_id=68	exec_time=0	error_code=0
SET TIMESTAMP=1702367813/*!*/;
SET @@session.pseudo_thread_id=68/*!*/;
SET @@session.foreign_key_checks=1, @@session.sql_auto_is_null=0, @@session.unique_checks=1, @@session.autocommit=1/*!*/;
SET @@session.sql_mode=1168113696/*!*/;
SET @@session.auto_increment_increment=1, @@session.auto_increment_offset=1/*!*/;
/*!\C utf8mb4 *//*!*/;
SET @@session.character_set_client=255,@@session.collation_connection=255,@@session.collation_server=255/*!*/;
SET @@session.lc_time_names=0/*!*/;
SET @@session.collation_database=DEFAULT/*!*/;
/*!80011 SET @@session.default_collation_for_utf8mb4=255*//*!*/;
BEGIN
/*!*/;
# at 322
#231212  1:56:53 server id 1  end_log_pos 395 CRC32 0xe88fd4cc 	Table_map: `bd2_practica1`.`habitacion` mapped to number 137
# has_generated_invisible_primary_key=0
# at 395
#231212  1:56:53 server id 1  end_log_pos 837 CRC32 0xbd97d25f 	Write_rows: table id 137 flags: STMT_END_F

BINLOG '
RRJ4ZRMBAAAASQAAAIsBAAAAAIkAAAAAAAMADWJkMl9wcmFjdGljYTEACmhhYml0YWNpb24AAgMP
AsgAAgEBAAID/P8AzNSP6A==
RRJ4ZR4BAAAAugEAAEUDAAAAAIkAAAAAAAEAAgAC/wABAAAAE1NhbGEgZGUgZXhhbWVuZXMgMQ0A
AgAAABNTYWxhIGRlIGV4YW1lbmVzIDINAAMAAAATU2FsYSBkZSBleGFtZW5lcyAzDQAEAAAAE1Nh
bGEgZGUgZXhhbWVuZXMgNA0ABQAAABNTYWxhIGRlIGltYWdlbmVzIDENAAYAAAAZU2FsYSBkZSBw
cm9jZWRpbWllbnRvcyAxDQAHAAAAGVNhbGEgZGUgcHJvY2VkaW1pZW50b3MgMg0ACAAAABlTYWxh
IGRlIHByb2NlZGltaWVudG9zIDMNAAkAAAAZU2FsYSBkZSBwcm9jZWRpbWllbnRvcyA0DQAKAAAA
ClJlY2VwY2lvbg0ACwAAAAxMYWJvcmF0b3Jpbw0ADAAAABlFc3RhY2nDs24gZGUgcmV2aXNpw7Nu
IDENAA0AAAAZRXN0YWNpw7NuIGRlIHJldmlzacOzbiAyDQAOAAAAGUVzdGFjacOzbiBkZSByZXZp
c2nDs24gMw0ADwAAABlFc3RhY2nDs24gZGUgcmV2aXNpw7NuIDQNX9KXvQ==
'/*!*/;
# at 837
#231212  1:56:53 server id 1  end_log_pos 868 CRC32 0x65205e60 	Xid = 13413
COMMIT/*!*/;
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
