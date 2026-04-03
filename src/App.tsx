import { useState } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ChevronLeft, ChevronRight, Download, Database } from 'lucide-react';

const OracleCheatSheets = () => {
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapters = [
    {
      title: "Architecture Oracle",
      color: "bg-red-50 border-red-200",
      sections: [
        {
          title: "🏗️ Composants Principaux",
          content: [
            "Serveur Oracle = Instance + Base de données",
            "",
            "Instance Oracle :",
            "• Processus d'arrière-plan",
            "• Zones mémoires (SGA + PGA)",
            "",
            "Base de données :",
            "• Fichiers de données",
            "• Fichiers de contrôle",
            "• Fichiers de journalisation"
          ]
        },
        {
          title: "💾 Structure Mémoire SGA",
          content: [
            "SGA (System Global Area) :",
            "",
            "• Shared Pool : SQL en cache",
            "  - Library Cache",
            "  - Dictionary Cache",
            "",
            "• Database Buffer Cache : blocs données",
            "",
            "• Redo Log Buffer : transactions",
            "",
            "• Large Pool : opérations volumineuses",
            "",
            "• Java Pool : JVM intégrée"
          ]
        },
        {
          title: "🔧 Paramètres SGA",
          content: [
            "SGA_MAX_SIZE : taille max SGA",
            "SHARED_POOL_SIZE : shared pool",
            "DB_CACHE_SIZE : buffer cache",
            "DB_BLOCK_SIZE : taille bloc",
            "LOG_BUFFER : redo log buffer",
            "LARGE_POOL_SIZE : large pool",
            "JAVA_POOL_SIZE : java pool",
            "",
            "// Afficher SGA",
            "SQL> SHOW SGA"
          ]
        },
        {
          title: "🔄 Processus d'Arrière-Plan",
          content: [
            "DBWn (Database Writer) :",
            "• Écrit buffer cache → fichiers données",
            "",
            "LGWR (Log Writer) :",
            "• Écrit redo buffer → redo log files",
            "",
            "PMON (Process Monitor) :",
            "• Récupère ressources processus défaillants",
            "",
            "SMON (System Monitor) :",
            "• Récupération instance après panne",
            "",
            "CKPT (Checkpoint) :",
            "• Synchronise fichiers contrôle/données",
            "",
            "ARCn (Archiver) :",
            "• Archive fichiers redo log"
          ]
        },
        {
          title: "📊 Structure Logique",
          content: [
            "Hiérarchie :",
            "",
            "TABLESPACE (espace logique)",
            "  ↓",
            "SEGMENT (table, index, etc.)",
            "  ↓",
            "EXTENT (ensemble blocs contigus)",
            "  ↓",
            "BLOC (plus petite unité)",
            "",
            "• 1 Tablespace = N fichiers données",
            "• 1 Fichier = 1 seul tablespace"
          ]
        },
        {
          title: "📁 Fichiers Physiques",
          content: [
            "Fichiers de données (.dbf) :",
            "• Contiennent tables, index, données",
            "",
            "Fichiers de contrôle (.ctl) :",
            "• Métadonnées de la base",
            "• Localisation fichiers",
            "",
            "Fichiers Redo Log (.log) :",
            "• Enregistrent modifications",
            "• Récupération après panne",
            "",
            "Fichiers archivés :",
            "• Sauvegarde redo logs (mode ARCHIVELOG)"
          ]
        }
      ]
    },
    {
      title: "Gestion Tablespaces & Fichiers",
      color: "bg-blue-50 border-blue-200",
      sections: [
        {
          title: "📦 Créer Tablespace",
          content: [
            "CREATE TABLESPACE tbs_name",
            "DATAFILE 'chemin/fichier.dbf'",
            "SIZE 100M",
            "AUTOEXTEND ON",
            "NEXT 10M",
            "MAXSIZE 500M",
            "EXTENT MANAGEMENT LOCAL",
            "AUTOALLOCATE",
            "SEGMENT SPACE MANAGEMENT AUTO;",
            "",
            "// Tablespace temporaire",
            "CREATE TEMPORARY TABLESPACE temp",
            "TEMPFILE 'temp01.dbf' SIZE 50M;"
          ]
        },
        {
          title: "🔄 Modifier Tablespace",
          content: [
            "// Ajouter fichier",
            "ALTER TABLESPACE tbs_name",
            "ADD DATAFILE 'file02.dbf' SIZE 100M;",
            "",
            "// Redimensionner",
            "ALTER DATABASE",
            "DATAFILE 'file01.dbf' RESIZE 200M;",
            "",
            "// OFFLINE/ONLINE",
            "ALTER TABLESPACE tbs OFFLINE;",
            "ALTER TABLESPACE tbs ONLINE;",
            "",
            "// READ ONLY/WRITE",
            "ALTER TABLESPACE tbs READ ONLY;",
            "ALTER TABLESPACE tbs READ WRITE;"
          ]
        },
        {
          title: "🗑️ Supprimer Tablespace",
          content: [
            "DROP TABLESPACE tbs_name",
            "INCLUDING CONTENTS",
            "CASCADE CONSTRAINTS;",
            "",
            "INCLUDING CONTENTS :",
            "• Supprime tous les objets",
            "",
            "CASCADE CONSTRAINTS :",
            "• Supprime contraintes externes"
          ]
        },
        {
          title: "📋 Vues Utiles",
          content: [
            "// Informations tablespaces",
            "DBA_TABLESPACES",
            "DBA_DATA_FILES",
            "V$DATAFILE",
            "",
            "// Exemple",
            "SELECT tablespace_name, file_name,",
            "  bytes/1024/1024 AS size_mb",
            "FROM dba_data_files;"
          ]
        },
        {
          title: "🔄 Gestion Redo Logs",
          content: [
            "// Ajouter groupe",
            "ALTER DATABASE",
            "ADD LOGFILE GROUP 3",
            "('redo03.log') SIZE 50M;",
            "",
            "// Ajouter membre",
            "ALTER DATABASE",
            "ADD LOGFILE MEMBER 'redo03b.log'",
            "TO GROUP 3;",
            "",
            "// Supprimer groupe",
            "ALTER DATABASE",
            "DROP LOGFILE GROUP 3;",
            "",
            "// Vues",
            "V$LOG : info groupes",
            "V$LOGFILE : info membres"
          ]
        },
        {
          title: "💾 Mode ARCHIVELOG",
          content: [
            "// Activer archivage",
            "SHUTDOWN IMMEDIATE;",
            "STARTUP MOUNT;",
            "ALTER DATABASE ARCHIVELOG;",
            "ALTER DATABASE OPEN;",
            "",
            "// Désactiver",
            "SHUTDOWN IMMEDIATE;",
            "STARTUP MOUNT;",
            "ALTER DATABASE NOARCHIVELOG;",
            "ALTER DATABASE OPEN;",
            "",
            "Avantages ARCHIVELOG :",
            "✓ Récupération complète",
            "✓ Sauvegarde à chaud"
          ]
        }
      ]
    },
    {
      title: "Gestion Instance & Démarrage",
      color: "bg-green-50 border-green-200",
      sections: [
        {
          title: "🚀 Démarrage Base de Données",
          content: [
            "STARTUP [options];",
            "",
            "Options :",
            "• NOMOUNT : instance seulement",
            "• MOUNT : + fichiers contrôle",
            "• OPEN : + fichiers données (défaut)",
            "• FORCE : arrêt puis démarrage",
            "• RESTRICT : mode restreint",
            "",
            "// Démarrage par étapes",
            "STARTUP NOMOUNT;",
            "ALTER DATABASE MOUNT;",
            "ALTER DATABASE OPEN;"
          ]
        },
        {
          title: "🛑 Arrêt Base de Données",
          content: [
            "SHUTDOWN [mode];",
            "",
            "NORMAL :",
            "• Attend déconnexion utilisateurs",
            "• Arrêt propre",
            "",
            "IMMEDIATE :",
            "• Déconnecte utilisateurs",
            "• ROLLBACK transactions",
            "• Arrêt propre",
            "",
            "TRANSACTIONAL :",
            "• Attend fin transactions",
            "",
            "ABORT :",
            "• Arrêt brutal",
            "• Récupération au prochain démarrage"
          ]
        },
        {
          title: "⚙️ Fichiers Paramètres",
          content: [
            "PFILE (Parameter File) :",
            "• Fichier texte : initSID.ora",
            "• Modifications manuelles",
            "",
            "SPFILE (Server Parameter File) :",
            "• Fichier binaire : spfileSID.ora",
            "• Modifications dynamiques",
            "",
            "// Créer PFILE depuis SPFILE",
            "CREATE PFILE='init.ora'",
            "FROM SPFILE;",
            "",
            "// Démarrer avec PFILE",
            "STARTUP PFILE='init.ora';"
          ]
        },
        {
          title: "🔧 Modifier Paramètres",
          content: [
            "ALTER SYSTEM SET paramètre=valeur",
            "[SCOPE=MEMORY|SPFILE|BOTH]",
            "[COMMENT='texte'];",
            "",
            "SCOPE :",
            "• MEMORY : session actuelle",
            "• SPFILE : permanent (après restart)",
            "• BOTH : les deux",
            "",
            "// Exemple",
            "ALTER SYSTEM SET",
            "  open_cursors=500",
            "  SCOPE=BOTH;"
          ]
        },
        {
          title: "🔒 Modes Spéciaux",
          content: [
            "// Mode restreint",
            "STARTUP RESTRICT;",
            "// ou",
            "ALTER SYSTEM",
            "  ENABLE RESTRICTED SESSION;",
            "",
            "// Privilège requis",
            "RESTRICTED SESSION",
            "",
            "// Mode lecture seule",
            "ALTER DATABASE OPEN READ ONLY;",
            "",
            "// Vérifier mode",
            "SELECT open_mode",
            "FROM v$database;"
          ]
        },
        {
          title: "📊 Vues Dynamiques",
          content: [
            "V$INSTANCE : état instance",
            "V$DATABASE : état base",
            "V$PARAMETER : paramètres",
            "V$SPPARAMETER : SPFILE params",
            "V$SGA : allocation SGA",
            "V$PROCESS : processus actifs",
            "V$SESSION : sessions utilisateurs",
            "",
            "// Exemple",
            "SELECT name, value",
            "FROM v$parameter",
            "WHERE name LIKE '%pool%';"
          ]
        }
      ]
    },
    {
      title: "Utilisateurs & Sécurité",
      color: "bg-purple-50 border-purple-200",
      sections: [
        {
          title: "👤 Créer Utilisateur",
          content: [
            "CREATE USER scott",
            "IDENTIFIED BY tiger",
            "DEFAULT TABLESPACE users",
            "TEMPORARY TABLESPACE temp",
            "QUOTA 100M ON users",
            "PROFILE app_user",
            "PASSWORD EXPIRE",
            "ACCOUNT UNLOCK;",
            "",
            "// Authentification OS",
            "CREATE USER \"OPS$WINDOWS_USER\"",
            "IDENTIFIED EXTERNALLY;"
          ]
        },
        {
          title: "🔄 Modifier Utilisateur",
          content: [
            "ALTER USER scott",
            "IDENTIFIED BY nouveau_mdp",
            "QUOTA 200M ON users",
            "ACCOUNT LOCK;",
            "",
            "// Déverrouiller",
            "ALTER USER scott ACCOUNT UNLOCK;",
            "",
            "// Expirer mot de passe",
            "ALTER USER scott PASSWORD EXPIRE;",
            "",
            "// Supprimer",
            "DROP USER scott CASCADE;"
          ]
        },
        {
          title: "📋 Profils Utilisateurs",
          content: [
            "CREATE PROFILE app_profile LIMIT",
            "  SESSIONS_PER_USER 3",
            "  CPU_PER_SESSION UNLIMITED",
            "  IDLE_TIME 30",
            "  CONNECT_TIME 480",
            "  FAILED_LOGIN_ATTEMPTS 3",
            "  PASSWORD_LIFE_TIME 90",
            "  PASSWORD_LOCK_TIME 1;",
            "",
            "// Activer limites",
            "ALTER SYSTEM SET",
            "  resource_limit=TRUE;"
          ]
        },
        {
          title: "🔑 Privilèges Système",
          content: [
            "// Accorder privilèges",
            "GRANT CREATE SESSION TO scott;",
            "GRANT CREATE TABLE TO scott;",
            "GRANT UNLIMITED TABLESPACE TO scott;",
            "",
            "// Avec admin option",
            "GRANT CREATE USER TO scott",
            "WITH ADMIN OPTION;",
            "",
            "// Révoquer",
            "REVOKE CREATE TABLE FROM scott;",
            "",
            "// Privilèges courants",
            "CREATE SESSION, CREATE TABLE,",
            "CREATE VIEW, CREATE PROCEDURE"
          ]
        },
        {
          title: "🔐 Privilèges Objet",
          content: [
            "// Accorder sur table",
            "GRANT SELECT, INSERT, UPDATE",
            "ON emp TO scott;",
            "",
            "// Toutes colonnes",
            "GRANT ALL ON emp TO scott;",
            "",
            "// Avec grant option",
            "GRANT SELECT ON emp TO scott",
            "WITH GRANT OPTION;",
            "",
            "// Révoquer (cascade)",
            "REVOKE SELECT ON emp FROM scott;",
            "",
            "Types : SELECT, INSERT, UPDATE,",
            "DELETE, ALTER, INDEX, EXECUTE"
          ]
        },
        {
          title: "👥 Rôles",
          content: [
            "// Créer rôle",
            "CREATE ROLE app_role;",
            "",
            "// Avec mot de passe",
            "CREATE ROLE secure_role",
            "IDENTIFIED BY password;",
            "",
            "// Accorder privilèges au rôle",
            "GRANT CREATE SESSION TO app_role;",
            "GRANT SELECT ON emp TO app_role;",
            "",
            "// Accorder rôle",
            "GRANT app_role TO scott;",
            "",
            "// Activer rôle",
            "SET ROLE app_role;",
            "",
            "// Supprimer",
            "DROP ROLE app_role;"
          ]
        },
        {
          title: "🔍 Vues Sécurité",
          content: [
            "DBA_USERS : utilisateurs",
            "DBA_TS_QUOTAS : quotas",
            "DBA_PROFILES : profils",
            "DBA_SYS_PRIVS : privs système",
            "DBA_TAB_PRIVS : privs objets",
            "DBA_ROLES : rôles",
            "DBA_ROLE_PRIVS : rôles/users",
            "SESSION_PRIVS : privs session",
            "SESSION_ROLES : rôles actifs"
          ]
        }
      ]
    },
    {
      title: "PL/SQL - Bases",
      color: "bg-yellow-50 border-yellow-200",
      sections: [
        {
          title: "📝 Structure Bloc PL/SQL",
          content: [
            "DECLARE",
            "  -- Déclarations variables",
            "  v_num NUMBER;",
            "  v_nom VARCHAR2(50);",
            "BEGIN",
            "  -- Instructions",
            "  SELECT ename INTO v_nom",
            "  FROM emp WHERE empno = 7788;",
            "  ",
            "  DBMS_OUTPUT.PUT_LINE(v_nom);",
            "EXCEPTION",
            "  -- Gestion erreurs",
            "  WHEN NO_DATA_FOUND THEN",
            "    DBMS_OUTPUT.PUT_LINE('Aucune donnée');",
            "END;",
            "/"
          ]
        },
        {
          title: "🔤 Types de Variables",
          content: [
            "// Types scalaires",
            "v_num NUMBER(5,2);",
            "v_text VARCHAR2(100);",
            "v_date DATE;",
            "v_bool BOOLEAN;",
            "",
            "// Type ancré (%TYPE)",
            "v_nom emp.ename%TYPE;",
            "",
            "// Type ligne (%ROWTYPE)",
            "v_emp emp%ROWTYPE;",
            "-- Accès : v_emp.ename",
            "",
            "// Constante",
            "c_tva CONSTANT NUMBER := 0.2;"
          ]
        },
        {
          title: "🔄 Structures Contrôle",
          content: [
            "// IF-THEN-ELSE",
            "IF condition THEN",
            "  instructions;",
            "ELSIF condition2 THEN",
            "  instructions;",
            "ELSE",
            "  instructions;",
            "END IF;",
            "",
            "// CASE",
            "CASE variable",
            "  WHEN valeur1 THEN instr1;",
            "  WHEN valeur2 THEN instr2;",
            "  ELSE instr_defaut;",
            "END CASE;"
          ]
        },
        {
          title: "🔁 Boucles",
          content: [
            "// LOOP basique",
            "LOOP",
            "  instructions;",
            "  EXIT WHEN condition;",
            "END LOOP;",
            "",
            "// WHILE",
            "WHILE condition LOOP",
            "  instructions;",
            "END LOOP;",
            "",
            "// FOR",
            "FOR i IN 1..10 LOOP",
            "  instructions;",
            "END LOOP;",
            "",
            "// FOR inversé",
            "FOR i IN REVERSE 1..10 LOOP"
          ]
        },
        {
          title: "📊 Collections",
          content: [
            "// TABLE (Associatif)",
            "TYPE t_tab IS TABLE OF NUMBER",
            "  INDEX BY BINARY_INTEGER;",
            "v_tab t_tab;",
            "v_tab(1) := 100;",
            "",
            "// VARRAY (Taille fixe)",
            "TYPE t_var IS VARRAY(10)",
            "  OF VARCHAR2(50);",
            "v_var t_var := t_var();",
            "",
            "// Méthodes",
            "v_tab.COUNT",
            "v_tab.FIRST / LAST",
            "v_tab.EXISTS(i)",
            "v_tab.DELETE"
          ]
        },
        {
          title: "📦 Records",
          content: [
            "// Définir type",
            "TYPE t_emp IS RECORD (",
            "  empno NUMBER(4),",
            "  ename VARCHAR2(10),",
            "  sal NUMBER(7,2)",
            ");",
            "",
            "// Déclarer variable",
            "v_emp t_emp;",
            "",
            "// Utiliser",
            "v_emp.empno := 7788;",
            "v_emp.ename := 'SCOTT';",
            "",
            "// Avec %ROWTYPE",
            "v_emp emp%ROWTYPE;"
          ]
        }
      ]
    },
    {
      title: "PL/SQL - Curseurs",
      color: "bg-pink-50 border-pink-200",
      sections: [
        {
          title: "📍 Curseurs Explicites",
          content: [
            "DECLARE",
            "  -- Déclaration",
            "  CURSOR c_emp IS",
            "    SELECT empno, ename, sal",
            "    FROM emp",
            "    WHERE deptno = 10;",
            "  ",
            "  v_emp c_emp%ROWTYPE;",
            "BEGIN",
            "  -- Ouverture",
            "  OPEN c_emp;",
            "  ",
            "  LOOP",
            "    -- Lecture",
            "    FETCH c_emp INTO v_emp;",
            "    EXIT WHEN c_emp%NOTFOUND;",
            "    ",
            "    -- Traitement",
            "  END LOOP;",
            "  ",
            "  -- Fermeture",
            "  CLOSE c_emp;",
            "END;"
          ]
        },
        {
          title: "🎯 Curseurs Paramétrés",
          content: [
            "DECLARE",
            "  CURSOR c_emp(p_deptno NUMBER) IS",
            "    SELECT * FROM emp",
            "    WHERE deptno = p_deptno;",
            "BEGIN",
            "  -- Ouvrir avec paramètre",
            "  FOR r IN c_emp(10) LOOP",
            "    DBMS_OUTPUT.PUT_LINE(r.ename);",
            "  END LOOP;",
            "END;"
          ]
        },
        {
          title: "🔧 Attributs Curseur",
          content: [
            "%FOUND : TRUE si ligne trouvée",
            "%NOTFOUND : TRUE si pas de ligne",
            "%ISOPEN : TRUE si curseur ouvert",
            "%ROWCOUNT : nombre lignes lues",
            "",
            "// Exemple",
            "IF c_emp%FOUND THEN",
            "  DBMS_OUTPUT.PUT_LINE(",
            "    'Lignes: ' || c_emp%ROWCOUNT);",
            "END IF;"
          ]
        },
        {
          title: "⚡ Curseur FOR Loop",
          content: [
            "// Syntaxe simplifiée",
            "BEGIN",
            "  FOR r IN (",
            "    SELECT empno, ename",
            "    FROM emp",
            "    WHERE sal > 2000",
            "  ) LOOP",
            "    DBMS_OUTPUT.PUT_LINE(r.ename);",
            "  END LOOP;",
            "END;",
            "",
            "Avantages :",
            "✓ Pas d'OPEN/CLOSE",
            "✓ Pas de FETCH",
            "✓ Gestion automatique"
          ]
        },
        {
          title: "🔄 Curseur FOR UPDATE",
          content: [
            "DECLARE",
            "  CURSOR c_emp IS",
            "    SELECT * FROM emp",
            "    WHERE deptno = 10",
            "    FOR UPDATE OF sal NOWAIT;",
            "BEGIN",
            "  FOR r IN c_emp LOOP",
            "    UPDATE emp",
            "    SET sal = sal * 1.1",
            "    WHERE CURRENT OF c_emp;",
            "  END LOOP;",
            "  COMMIT;",
            "END;",
            "",
            "NOWAIT : erreur si verrouillé"
          ]
        },
        {
          title: "📋 Curseurs Implicites",
          content: [
            "// Pour SELECT INTO",
            "BEGIN",
            "  SELECT ename INTO v_nom",
            "  FROM emp",
            "  WHERE empno = 7788;",
            "END;",
            "",
            "// Attributs SQL%",
            "SQL%FOUND",
            "SQL%NOTFOUND",
            "SQL%ROWCOUNT",
            "",
            "UPDATE emp SET sal = sal*1.1;",
            "DBMS_OUTPUT.PUT_LINE(",
            "  SQL%ROWCOUNT || ' lignes');"
          ]
        }
      ]
    },
    {
      title: "PL/SQL - Sous-programmes",
      color: "bg-indigo-50 border-indigo-200",
      sections: [
        {
          title: "📦 Procédures Stockées",
          content: [
            "CREATE OR REPLACE PROCEDURE",
            "  augmenter_salaire(",
            "    p_empno IN NUMBER,",
            "    p_pct IN NUMBER",
            "  )",
            "IS",
            "  v_sal NUMBER;",
            "BEGIN",
            "  UPDATE emp",
            "  SET sal = sal * (1 + p_pct/100)",
            "  WHERE empno = p_empno;",
            "  ",
            "  COMMIT;",
            "EXCEPTION",
            "  WHEN OTHERS THEN",
            "    ROLLBACK;",
            "    RAISE;",
            "END;",
            "/",
            "",
            "// Appel",
            "EXEC augmenter_salaire(7788, 10);"
          ]
        },
        {
          title: "🔢 Fonctions",
          content: [
            "CREATE OR REPLACE FUNCTION",
            "  calculer_prime(p_empno NUMBER)",
            "  RETURN NUMBER",
            "IS",
            "  v_sal NUMBER;",
            "  v_prime NUMBER;",
            "BEGIN",
            "  SELECT sal INTO v_sal",
            "  FROM emp",
            "  WHERE empno = p_empno;",
            "  ",
            "  v_prime := v_sal * 0.15;",
            "  RETURN v_prime;",
            "END;",
            "/",
            "",
            "// Utilisation",
            "SELECT ename,",
            "  calculer_prime(empno) AS prime",
            "FROM emp;"
          ]
        },
        {
          title: "↔️ Modes Paramètres",
          content: [
            "IN (défaut) :",
            "• Valeur passée à la procédure",
            "• Lecture seule",
            "",
            "OUT :",
            "• Valeur retournée par procédure",
            "• Écriture seule",
            "",
            "IN OUT :",
            "• Lecture et écriture",
            "",
            "// Exemple OUT",
            "PROCEDURE get_info(",
            "  p_empno IN NUMBER,",
            "  p_nom OUT VARCHAR2,",
            "  p_sal OUT NUMBER",
            ")"
          ]
        },
        {
          title: "📚 Packages",
          content: [
            "// Spécification (header)",
            "CREATE OR REPLACE PACKAGE pkg_emp IS",
            "  -- Public",
            "  PROCEDURE augmenter(p_empno NUMBER);",
            "  FUNCTION get_sal(p_empno NUMBER)",
            "    RETURN NUMBER;",
            "END pkg_emp;",
            "/",
            "",
            "// Corps (body)",
            "CREATE OR REPLACE PACKAGE BODY",
            "pkg_emp IS",
            "  -- Privé",
            "  c_bonus CONSTANT NUMBER := 100;",
            "  ",
            "  -- Implémentations",
            "  PROCEDURE augmenter(...) IS",
            "  BEGIN ... END;",
            "  ",
            "  FUNCTION get_sal(...)",
            "    RETURN NUMBER IS",
            "  BEGIN ... END;",
            "END pkg_emp;",
            "/"
          ]
        },
        {
          title: "🔍 Packages Système",
          content: [
            "DBMS_OUTPUT :",
            "• PUT_LINE : afficher messages",
            "",
            "DBMS_SQL :",
            "• SQL dynamique",
            "",
            "DBMS_JOB :",
            "• Planification tâches",
            "",
            "UTL_FILE :",
            "• Lecture/écriture fichiers",
            "",
            "DBMS_LOB :",
            "• Manipulation LOBs",
            "",
            "// Activer sortie",
            "SET SERVEROUTPUT ON"
          ]
        },
        {
          title: "🗑️ Gestion Sous-programmes",
          content: [
            "// Supprimer",
            "DROP PROCEDURE nom_proc;",
            "DROP FUNCTION nom_func;",
            "DROP PACKAGE nom_pkg;",
            "",
            "// Recompiler",
            "ALTER PROCEDURE nom_proc COMPILE;",
            "ALTER FUNCTION nom_func COMPILE;",
            "ALTER PACKAGE nom_pkg COMPILE;",
            "",
            "// Erreurs compilation",
            "SHOW ERRORS",
            "",
            "// Vues",
            "USER_PROCEDURES",
            "USER_SOURCE",
            "USER_ERRORS"
          ]
        }
      ]
    },
    {
      title: "PL/SQL - Exceptions & Triggers",
      color: "bg-orange-50 border-orange-200",
      sections: [
        {
          title: "⚠️ Exceptions Prédéfinies",
          content: [
            "NO_DATA_FOUND : SELECT sans résultat",
            "TOO_MANY_ROWS : SELECT > 1 ligne",
            "ZERO_DIVIDE : division par zéro",
            "VALUE_ERROR : erreur conversion",
            "INVALID_CURSOR : curseur invalide",
            "CURSOR_ALREADY_OPEN : curseur ouvert",
            "DUP_VAL_ON_INDEX : doublon clé unique",
            "INVALID_NUMBER : conversion invalide",
            "",
            "// Utilisation",
            "EXCEPTION",
            "  WHEN NO_DATA_FOUND THEN",
            "    -- traitement",
            "  WHEN OTHERS THEN",
            "    -- toutes autres erreurs"
          ]
        },
        {
          title: "🔨 Exceptions Personnalisées",
          content: [
            "// Déclarer",
            "DECLARE",
            "  ex_salaire_negatif EXCEPTION;",
            "  v_sal NUMBER;",
            "BEGIN",
            "  SELECT sal INTO v_sal FROM emp",
            "  WHERE empno = 7788;",
            "  ",
            "  IF v_sal < 0 THEN",
            "    RAISE ex_salaire_negatif;",
            "  END IF;",
            "EXCEPTION",
            "  WHEN ex_salaire_negatif THEN",
            "    DBMS_OUTPUT.PUT_LINE('Erreur!');",
            "END;"
          ]
        },
        {
          title: "🎯 PRAGMA EXCEPTION_INIT",
          content: [
            "// Associer exception à erreur Oracle",
            "DECLARE",
            "  ex_constraint EXCEPTION;",
            "  PRAGMA EXCEPTION_INIT(",
            "    ex_constraint, -2291);",
            "BEGIN",
            "  -- Code...",
            "EXCEPTION",
            "  WHEN ex_constraint THEN",
            "    DBMS_OUTPUT.PUT_LINE(",
            "      'Violation contrainte');",
            "END;",
            "",
            "// Erreurs Oracle courantes",
            "-1 : Contrainte unique",
            "-1422 : TOO_MANY_ROWS",
            "-2291 : Contrainte FK"
          ]
        },
        {
          title: "🔔 Triggers - Base",
          content: [
            "CREATE OR REPLACE TRIGGER trg_nom",
            "{BEFORE | AFTER}",
            "{INSERT | UPDATE | DELETE}",
            "ON table_name",
            "[FOR EACH ROW]",
            "[WHEN (condition)]",
            "DECLARE",
            "  -- Variables",
            "BEGIN",
            "  -- Code trigger",
            "END;",
            "/",
            "",
            "BEFORE : avant modification",
            "AFTER : après modification",
            "FOR EACH ROW : niveau ligne"
          ]
        },
        {
          title: "🎭 Variables :OLD et :NEW",
          content: [
            "// Dans trigger niveau ligne",
            "",
            "INSERT :",
            "• :NEW.col = nouvelle valeur",
            "",
            "UPDATE :",
            "• :OLD.col = ancienne valeur",
            "• :NEW.col = nouvelle valeur",
            "",
            "DELETE :",
            "• :OLD.col = ancienne valeur",
            "",
            "// Exemple",
            "IF :NEW.sal < :OLD.sal THEN",
            "  RAISE_APPLICATION_ERROR(-20001,",
            "    'Salaire ne peut diminuer');",
            "END IF;"
          ]
        },
        {
          title: "🔍 Prédicats Trigger",
          content: [
            "// Détecter type opération",
            "CREATE OR REPLACE TRIGGER trg_emp",
            "BEFORE INSERT OR UPDATE OR DELETE",
            "ON emp",
            "FOR EACH ROW",
            "BEGIN",
            "  IF INSERTING THEN",
            "    -- Code insertion",
            "  ELSIF UPDATING THEN",
            "    -- Code update",
            "  ELSIF DELETING THEN",
            "    -- Code suppression",
            "  END IF;",
            "END;",
            "/",
            "",
            "UPDATING('colonne') : TRUE si",
            "colonne modifiée"
          ]
        },
        {
          title: "🛠️ Gestion Triggers",
          content: [
            "// Désactiver",
            "ALTER TRIGGER trg_nom DISABLE;",
            "",
            "// Activer",
            "ALTER TRIGGER trg_nom ENABLE;",
            "",
            "// Tous triggers table",
            "ALTER TABLE emp",
            "  DISABLE ALL TRIGGERS;",
            "",
            "ALTER TABLE emp",
            "  ENABLE ALL TRIGGERS;",
            "",
            "// Supprimer",
            "DROP TRIGGER trg_nom;",
            "",
            "// Vues",
            "USER_TRIGGERS",
            "DBA_TRIGGERS"
          ]
        }
      ]
    },
    {
      title: "Transactions & Avancé",
      color: "bg-teal-50 border-teal-200",
      sections: [
        {
          title: "💾 Gestion Transactions",
          content: [
            "// Valider",
            "COMMIT;",
            "",
            "// Annuler",
            "ROLLBACK;",
            "",
            "// Point de sauvegarde",
            "SAVEPOINT point1;",
            "-- Opérations...",
            "SAVEPOINT point2;",
            "-- Autres opérations...",
            "",
            "// Retour au point",
            "ROLLBACK TO point1;",
            "",
            "// Transaction autonome",
            "PRAGMA AUTONOMOUS_TRANSACTION;",
            "-- Dans procédure/fonction"
          ]
        },
        {
          title: "🔒 Principe ACID",
          content: [
            "Atomicité :",
            "• Tout ou rien",
            "• Rollback si erreur",
            "",
            "Cohérence :",
            "• État cohérent avant/après",
            "• Contraintes respectées",
            "",
            "Isolation :",
            "• Transactions indépendantes",
            "• Pas d'interférence",
            "",
            "Durabilité :",
            "• COMMIT permanent",
            "• Récupération après panne"
          ]
        },
        {
          title: "🔐 Verrouillage",
          content: [
            "// Verrouillage explicite",
            "LOCK TABLE emp",
            "IN EXCLUSIVE MODE NOWAIT;",
            "",
            "Modes :",
            "• SHARE : lecture partagée",
            "• EXCLUSIVE : écriture exclusive",
            "• ROW SHARE",
            "• ROW EXCLUSIVE",
            "",
            "// SELECT FOR UPDATE",
            "SELECT * FROM emp",
            "WHERE deptno = 10",
            "FOR UPDATE NOWAIT;",
            "",
            "NOWAIT : erreur si verrouillé",
            "WAIT n : attend n secondes"
          ]
        },
        {
          title: "📊 Vues (Views)",
          content: [
            "// Créer vue simple",
            "CREATE OR REPLACE VIEW v_emp AS",
            "SELECT empno, ename, sal",
            "FROM emp",
            "WHERE deptno = 10;",
            "",
            "// Vue complexe",
            "CREATE VIEW v_dept_stats AS",
            "SELECT d.deptno, d.dname,",
            "  COUNT(*) nb_emp,",
            "  AVG(e.sal) sal_moyen",
            "FROM dept d, emp e",
            "WHERE d.deptno = e.deptno",
            "GROUP BY d.deptno, d.dname;",
            "",
            "// Supprimer",
            "DROP VIEW v_emp;"
          ]
        },
        {
          title: "✏️ Vues Modifiables",
          content: [
            "// WITH CHECK OPTION",
            "CREATE VIEW v_emp_10 AS",
            "SELECT * FROM emp",
            "WHERE deptno = 10",
            "WITH CHECK OPTION;",
            "",
            "-- Empêche INSERT/UPDATE",
            "-- violant WHERE clause",
            "",
            "// WITH READ ONLY",
            "CREATE VIEW v_emp_ro AS",
            "SELECT * FROM emp",
            "WITH READ ONLY;",
            "",
            "-- Vue non modifiable"
          ]
        },
        {
          title: "🎯 Séquences",
          content: [
            "// Créer séquence",
            "CREATE SEQUENCE seq_emp",
            "START WITH 1000",
            "INCREMENT BY 1",
            "MAXVALUE 9999",
            "NOCYCLE",
            "CACHE 20;",
            "",
            "// Utiliser",
            "INSERT INTO emp (empno, ename)",
            "VALUES (seq_emp.NEXTVAL, 'SMITH');",
            "",
            "// Valeur actuelle",
            "SELECT seq_emp.CURRVAL FROM dual;",
            "",
            "// Modifier",
            "ALTER SEQUENCE seq_emp",
            "  INCREMENT BY 5;"
          ]
        },
        {
          title: "🔍 SQL Dynamique",
          content: [
            "// EXECUTE IMMEDIATE",
            "DECLARE",
            "  v_sql VARCHAR2(200);",
            "  v_count NUMBER;",
            "BEGIN",
            "  v_sql := 'SELECT COUNT(*) FROM emp';",
            "  EXECUTE IMMEDIATE v_sql",
            "    INTO v_count;",
            "  ",
            "  -- Avec paramètres",
            "  v_sql := 'UPDATE emp SET sal = :1",
            "    WHERE empno = :2';",
            "  EXECUTE IMMEDIATE v_sql",
            "    USING 3000, 7788;",
            "END;",
            "",
            "⚠️ Attention injection SQL !"
          ]
        },
        {
          title: "💡 Bonnes Pratiques",
          content: [
            "✓ Toujours gérer exceptions",
            "✓ Fermer curseurs explicites",
            "✓ Utiliser %TYPE et %ROWTYPE",
            "✓ Commenter le code",
            "✓ Nommer variables clairement",
            "✓ Éviter SQL dans boucles",
            "✓ Utiliser BULK COLLECT",
            "✓ Privilégier packages",
            "✓ Tester avec SHOW ERRORS",
            "✓ Activer SERVEROUTPUT pour debug"
          ]
        }
      ]
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const currentSheet = chapters[currentChapter];

  return (
    <div className="min-h-screen bg-gray-100 p-4 print:p-0">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto mb-4 print:hidden">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-center mb-4">
            <Database className="text-red-600 mr-2" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">
              Bases de Données Avancées - Oracle & PL/SQL
            </h1>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
              disabled={currentChapter === 0}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
            >
              <ChevronLeft size={20} />
              Précédent
            </button>

            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {currentSheet.title}
              </h2>
              <p className="text-sm text-gray-600">
                Partie {currentChapter + 1} sur {chapters.length}
              </p>
            </div>

            <button
              onClick={() => setCurrentChapter(Math.min(chapters.length - 1, currentChapter + 1))}
              disabled={currentChapter === chapters.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
            >
              Suivant
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {chapters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentChapter(idx)}
                className={`w-3 h-3 rounded-full transition ${idx === currentChapter ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
        >
          <Download size={20} />
          Télécharger/Imprimer en PDF
        </button>
      </div>

      {/* Cheatsheet Content */}
      <div className={`max-w-4xl mx-auto bg-white rounded-lg shadow-lg print:shadow-none print:rounded-none ${currentSheet.color} border-2`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 print:p-4">
          <div className="flex items-center mb-2">
            <Database className="mr-3" size={40} />
            <div>
              <h1 className="text-3xl font-bold print:text-2xl">
                {currentSheet.title}
              </h1>
              <p className="text-red-100 mt-1">
                Bases de Données Avancées - Oracle & PL/SQL
              </p>
            </div>
          </div>
          <p className="text-sm text-red-200">
            Administration Oracle & Programmation PL/SQL
          </p>
        </div>

        {/* Content */}
        <div className="p-6 print:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentSheet.sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border-2 border-gray-200 p-4 shadow-sm hover:shadow-md transition print:break-inside-avoid"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-red-300 pb-2">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.content.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className={`text-sm ${item.startsWith('//') ||
                          item.startsWith('--') ||
                          item.includes('SELECT') ||
                          item.includes('CREATE') ||
                          item.includes('ALTER') ||
                          item.includes('BEGIN') ||
                          item.includes('DECLARE') ||
                          item === '' ||
                          item.includes('  ')
                          ? 'font-mono bg-gray-50 px-2 py-0.5 rounded text-gray-700 text-xs'
                          : item.startsWith('✓') || item.startsWith('•')
                            ? 'text-gray-700 ml-2'
                            : item.startsWith('⚠️') || item.startsWith('❌')
                              ? 'text-red-600 font-semibold'
                              : 'text-gray-700 font-medium'
                        }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center text-sm text-gray-600 border-t-2 border-gray-200">
          <p>© 2025 - Bases de Données Avancées - Oracle & PL/SQL - SMI6/II6</p>
        </div>
      </div>

      {/* Print Instructions */}
      <div className="max-w-4xl mx-auto mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 print:hidden">
        <h3 className="font-bold text-blue-900 mb-2">💡 Instructions pour l'impression PDF :</h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Cliquez sur "Télécharger/Imprimer en PDF"</li>
          <li>Dans la fenêtre d'impression, sélectionnez "Enregistrer au format PDF"</li>
          <li>Répétez pour chaque partie (8 parties au total)</li>
          <li>Vous pouvez fusionner tous les PDFs ensuite avec un outil en ligne</li>
        </ol>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          @page {
            margin: 1cm;
            size: A4;
          }
        }
      `}</style>
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default OracleCheatSheets;