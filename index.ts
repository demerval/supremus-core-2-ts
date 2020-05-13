require('dotenv/config');

import SupremusCoreI from './src/SupremusCore';
import DAOI from './src/database/DAO';
import ConsultaI from './src/sql/Consulta';
import CriptografiaI from './src/base/Criptografia';

import ModelI from './src/model/Model';
import ModelManagerI from './src/model/ModelManager';
import ModelPersisteI from './src/model/ModelPersiste';
import ModelUpdateVersaoUtil from './src/model/ModelUpdateVersaoUtil';

import CampoBooleanI from './src/campos/CampoBoolean';
import CampoDateI from './src/campos/CampoDate';
import CampoNumberI from './src/campos/CampoNumber';
import CampoStringI from './src/campos/CampoString';

import { Status as StatusI, FieldType as FieldTypeI, CaseType as CaseTypeI } from './src/enums';

import { Auth } from './src/middlewares/Auth';
import { Crypto } from './src/middlewares/Crypto';

export const SupremusCore = SupremusCoreI;
export const DAO = DAOI;
export const Consulta = ConsultaI;
export const Criptografia = CriptografiaI;

export const Model = ModelI;
export const ModelManager = ModelManagerI;
export const ModelPersite = ModelPersisteI;
export const ModelUpdateVersao = ModelUpdateVersaoUtil;

export const CampoBoolean = CampoBooleanI;
export const CampoDate = CampoDateI;
export const CampoNumber = CampoNumberI;
export const CampoString = CampoStringI;

export const Status = StatusI;
export const FieldType = FieldTypeI;
export const CaseType = CaseTypeI;

export const AuthMiddleware = Auth;
export const CryptoMiddleware = Crypto;