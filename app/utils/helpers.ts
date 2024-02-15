import { StravaActivitieType, StravaActivitiesType, StravaTotal } from "../types/schema";


export function formaterDate(dateStr:string) : string {
  const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', // jour de la semaine
      day: 'numeric', // date
      month: 'long', // mois
      year: 'numeric', // année
      hour: 'numeric', // heure
      minute: 'numeric', // minute
      hour12: false // format 24 heures
  };

  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

export function convertSecondsInTime(secondes: number): string {
  const heures = Math.floor(secondes / 3600);
  const minutes = Math.floor((secondes % 3600) / 60);
  const secondesRestantes = secondes % 60;

  let temps = '';
  if (heures > 0) {
      temps += `${heures}h `;
  }
  temps += `${minutes < 10 ? '0' + minutes : minutes}mn ${secondesRestantes < 10 ? '0' + secondesRestantes : secondesRestantes}s`;

  return temps;
}

export function convertSpeed(speed: number) : string {

    let vitesseKmmin = 1000 / speed;
    let minutes = Math.floor(vitesseKmmin / 60);
    let secondes = Math.round(vitesseKmmin % 60);

    return `${minutes}:${secondes}mn/km`;
}

function getStartOfWeek(date: Date): Date {
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(date.setDate(diff)); // Affectez la nouvelle date
}

export function getEpochTime(today: Date): {
  previousWeekEpoch: number;
  previousMonthEpoch: number;
  januaryFirstEpoch: number;
} {
  // Date de la semaine précédente
  const previousWeek = getStartOfWeek(today);
  previousWeek.setHours(0, 0, 0);
  const previousWeekEpoch = Math.round(previousWeek.getTime() / 1000);

  // Date du mois précédent
  const previousMonth = getStartOfWeek(today);
  previousMonth.setDate(previousMonth.getDate() - 21);
  const previousMonthEpoch = Math.round(previousMonth.getTime() / 1000);

  // Date du 1er janvier de l'année en cours
  const januaryFirst = new Date(today.getFullYear(), 0, 1);
  const januaryFirstEpoch = Math.round(januaryFirst.getTime() / 1000);


  return { previousWeekEpoch, previousMonthEpoch , januaryFirstEpoch};
}

export function calculateMonthlyTotalRuns(activities: StravaActivitiesType) : StravaTotal[] {
  const monthlyDistance: Record<string, number> = {};

  activities.forEach((activity) => {
    const {distance, start_date_local} = activity
    const startDate = new Date(start_date_local);
    const monthNames = [
      "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
      "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
    ];

    const month = startDate.getMonth();
    const monthKey = `${monthNames[month]}`;

    if(monthlyDistance[monthKey]) {
      monthlyDistance[monthKey] += Number((distance / 1000).toFixed(2));
    } else {
      monthlyDistance[monthKey] = Number((distance / 1000).toFixed(2));
    }
  })

  const monthlyTotalRuns = Object.keys(monthlyDistance).map((key) => {
    return {
      date: key,
      kilometers: Number((monthlyDistance[key]).toFixed(2)),
    };
})


return monthlyTotalRuns;

}

export function calculateWeeklyTotalRuns(
  activities: StravaActivitiesType
): StravaTotal[] {
  const weeklyDistance: Record<string, number> = {};
  

  activities.forEach((activity) => {

    const startDate = getStartOfWeek(new Date(activity.start_date_local));

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    const weekStartDate = `${startDate.getDate()} ${
      endDate.getMonth() !== startDate.getMonth()
        ? startDate.toLocaleString("default", { month: "short" }) + "."
        : ""
    }`;
    const weekEndDate = `${endDate.getDate()} ${endDate.toLocaleString(
      "default",
      { month: "short" }
    )}.`;

    const weekKey = `${weekStartDate} - ${weekEndDate}`;

    if (weeklyDistance[weekKey]) {
      weeklyDistance[weekKey] += Number((activity.distance / 1000).toFixed(2));
    } else {
      weeklyDistance[weekKey] = Number((activity.distance / 1000).toFixed(2));
    }
  });

  const weeklyTotalRuns = Object.keys(weeklyDistance).map((key) => {
    return {
      date: key,
      kilometers: Number(weeklyDistance[key].toFixed(2)),
    };
})


return weeklyTotalRuns;


}

export const getWeekSummary = (activities: StravaActivitiesType) => {

  let totalKilometers = 0;
  let totalSeconds = 0;
  let totalElevation = 0;

  activities.forEach((activity: StravaActivitieType) => {
    totalKilometers+=Number((activity.distance / 1000).toFixed(2));
    totalSeconds+=activity.moving_time;
    totalElevation+=Number(activity.total_elevation_gain.toFixed(2));
  })

  const totalTime = convertSecondsInTime(totalSeconds)

  return {
    distance: `${totalKilometers}km`,
    time: totalTime,
    elevation: `${totalElevation}m`
  }

}

export const getTotalMonth = (activies: StravaActivitiesType) => {

}


export const activitiesMocked : StravaActivitiesType = [
  {
      "id": 123456,
      "name": "Afternoon Run",
      "distance": 7002.1,
      "moving_time": 2884,
      "elapsed_time": 2909,
      "total_elevation_gain": 18.8,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-04T13:38:31Z",
      "start_date_local": "2024-01-04T14:38:31Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10492525104",
          "summary_polyline": "mhjvGyar\\CJ{@RaANwBTaCLg@J_B^}A?g@Bi@@WBMGIMGUGs@EmA@}AQyACcCEq@GOEGICa@AMEIMG[JyCJqAv@eCXiAViA?OCMkAkA[i@Os@?g@Em@AkAKeACMGIW?CGKmCM}@[w@_@e@][w@YQAY@c@C{@@e@Kc@@_@Ai@FgAKc@FOAa@Eo@S[GW@m@FQNc@Be@Gg@Ks@Ea@Iq@Em@Ok@@i@Cc@Gm@D{@Iq@CsAJgAPq@A_@BWGW[SIS?i@Em@Dm@JS?QDo@@m@E_Aa@}@Ik@MI?ADEt@@dAP`B@h@XtAHdA\\~@FXKn@U`@O`@Gj@@d@T|ALfAv@bEb@`Bt@vBHZf@pATb@V\\f@bAX`Af@jAd@lBL^`@n@r@`ARL`@JPLFLJdAL^fAvAxA`Bn@|@LV\\\\f@`@HDF?`A[TQ^QXCXD^Xh@|@t@p@h@`Af@j@f@d@\\NJ@b@INGJKXc@~@uBj@gAlAmDl@yAb@oAb@qB|@sC|AkEh@qAd@y@LKRMt@ULOVaAN{A~@cD^kB@[GMm@o@[e@WYEQCa@ISKc@g@_@KQCW?{@IuA?u@Q}AOs@Sg@a@a@qAa@uAWaDAMB_@Jy@BeAIoAA[CeCo@cCYY?G@CBAD@Dn@~AR|AVx@Vf@b@b@TDTLL@FBTTTLRR`Ah@fBr@b@LV?lA_@p@Kf@?^Fb@Cv@Pj@\\\\\\V`@n@v@"
      },
      "average_speed": 2.428,
      "max_speed": 3.801,
      "has_heartrate": true,
      "average_heartrate": 157.7,
      "max_heartrate": 177,
      "elev_high": 173.8,
      "elev_low": 167
  },
  {
      "id": 1234567,
      "name": "Afternoon Run",
      "distance": 7553.9,
      "moving_time": 3601,
      "elapsed_time": 3603,
      "total_elevation_gain": 23.2,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-06T14:17:09Z",
      "start_date_local": "2024-01-06T15:17:09Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10505740642",
          "summary_polyline": "cijvGqar\\kATsADm@DqDh@eB^oCD{@JMEMM[oAa@}@My@Es@DuAGeAEaCGYS_@Ac@Gg@Ce@FuAL{@`@mARy@b@yAH[?QIOw@q@Uc@[QE[@k@Cq@MsAGcBCGECY?IIIe@GmAY{AUi@[_@q@WuA_@y@MoBBs@C}@L[?_@Dk@Gm@?m@CUEg@Ok@CcBe@WC]Ii@As@?_BUiCAa@D{@Bu@Ac@D_AR]@_@IW]QI]B[Gy@E{@NSHi@@{AU[Ge@EaAWG@Cx@?~@RtC\\nALtAXr@DP?JET]v@QlA?b@HlAFl@Nn@Bb@Jx@\\dATpAVr@Pz@l@xA\\n@Rf@T`@Vp@p@nAt@rB^`BVj@d@l@Xb@NLv@RJFHV@h@DXZt@f@r@`@Z`B|BdAjA`BxAR\\NNZLPN`@RF?Uu@o@kAIQAM@OFGd@UNCXNh@n@jA|@|@~AfAnAVBj@EPENOT_@j@qA|@gBn@{ARu@t@iBb@_BVsAz@mC^}@t@}Bl@_Bh@eAX]^Yr@QHGFMLg@L}AJm@X_Av@yCH]BWCMk@k@m@{@]}@Eq@?uBKkAGI]AIGEKKaAIqAQu@Yq@QQUOUIwAYqAKWE}@Fy@BUEQ@WC[FYBk@GWASA[BWAqAQqA]i@IY?kB[y@BSEOG_@Ea@HSAXCFF_@bCIdBIhBHrATj@Ln@\\x@b@rCn@zBFh@XbAJp@Nb@XZx@n@jAj@j@p@r@f@PD@HGXAZDj@?l@H\\f@?d@BnAPZ@pANjB?n@Kv@EXEn@g@x@U`AOn@Ob@Cb@ARHHJ@h@BLPZF`@"
      },
      "average_speed": 2.098,
      "max_speed": 7.45,
      "has_heartrate": true,
      "average_heartrate": 145.8,
      "max_heartrate": 154,
      "elev_high": 172.8,
      "elev_low": 165.4
  },
  {
      "id": 12345679,
      "name": "Afternoon Run",
      "distance": 7098.6,
      "moving_time": 2701,
      "elapsed_time": 2926,
      "total_elevation_gain": 23.8,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-10T14:22:30Z",
      "start_date_local": "2024-01-10T15:22:30Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10531590495",
          "summary_polyline": "injvG_`r\\cAHkABo@Fg@HmA`@[DmA?aAGgAFUGMSKc@Gu@AuCWiEOuAQe@EO?]Gk@@eALsCAuAGi@Ok@Qm@]y@Kg@EkDD{BGyA]kDEWWk@OUQOICQCOGUEy@SaAQwAA[FW@_AVc@@gAMk@AQE[AaAQk@QsAOw@MoCK}@UeA?_@CQEsB@sAH]DQFc@Jw@Ii@DaA\\i@d@[`@i@t@Sh@i@t@kAdAQX_@pAKb@E^Cn@Ft@FZRf@j@x@VVpCrEXn@ZfAjAjD\\pAr@fBv@nA`@^t@j@v@bAXl@J`@t@zBb@z@l@`Ar@~@Xj@d@l@~@dAn@~@Vb@dCpCfAxAZXTHHGh@CPG`@g@Tg@^aAdB_EPe@n@yA^qAf@uBh@iBt@iBbAaD|@wBDIl@k@VI`@GNMNqALgB@u@A{@SmAMe@Wq@Oq@EiBCiCQqFIiAQu@Wg@c@]WKs@MiA]_AEe@?qADk@Dk@?e@FW?g@GuAKmBWqA_@o@KK@g@AuAMaAE_AAo@IgBNiCBUBa@HmAB}@\\OJaA`AY\\cAlBcA`Ac@p@e@lAMx@?r@Fn@\\x@T`@`CrCVd@^|@TZPh@Nv@p@nBlAbE\\t@\\p@b@p@~AxAd@n@`@`ArE`JhAzANLP\\jAfAdArANVf@d@^r@d@l@^ZXNh@FFFPh@d@DjAr@H?FC\\y@"
      },
      "average_speed": 2.628,
      "max_speed": 6.444,
      "has_heartrate": true,
      "average_heartrate": 159.7,
      "max_heartrate": 187,
      "elev_high": 173.8,
      "elev_low": 165.8
  },
  {
      "id": 123456787,
      "name": "Afternoon Run",
      "distance": 7658.8,
      "moving_time": 3601,
      "elapsed_time": 3726,
      "total_elevation_gain": 22.2,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-11T14:29:12Z",
      "start_date_local": "2024-01-11T15:29:12Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10537828337",
          "summary_polyline": "mhjvGsar\\_@NqA^QBm@?c@D}B^wARgATw@DiA?mADMAEEi@wFE}@HiA@qAUoB@w@Ku@{@GIIC_@DeAHu@Ps@Z}@PgA\\mAD]EMc@c@o@y@IOMu@KwCMeBGEOBGAGCEECQ[gDOe@Qa@MMYSm@Wc@MsAOiBE{@Hg@Pa@Bi@Kc@CY@_AMk@AeAUgBSs@McBIo@?k@O]Cg@FY?UCm@Ma@Bq@Aa@Nc@Ba@FY@mBJgAN]HURe@h@wAbCSXUNKPQPc@l@MTa@rAa@v@Oh@Er@NbABZLp@JjA^|APjALd@L^Zp@Rz@J^|@dBj@bAVh@b@xAXn@r@bCPh@|@hATT`@XXLFFHPN~@Nd@PV|@z@n@`AVb@pArAb@l@h@^rArA`@Z`@RBCCIWi@_@o@K[C[?KFINQLIXATHRLn@p@l@v@|@dA\\n@X`@XTXFRCXIVSnA{Bl@oAv@}Bj@uAPk@P]^gAb@{Br@}Bz@{Bj@cBf@oAXg@^_@z@SNKJULe@NcCBsA]{Bq@uBEYEgA@_AIgABaBG_CWiCOg@Uc@MIgAYg@Su@MyA?iAIQBk@V]B_AIy@?_@Ck@Ac@GsBk@oCWe@OMAa@?u@Ei@HYAkBQoAVcCH[Fk@Am@B[F_@NEDe@d@[f@m@p@a@|@UTSZ[X_@R]r@[jAE^CbADf@Ln@lBjCTZ\\Z^j@Rn@t@`Bp@hCN`@p@|BdAdCp@`A|@p@jA~Al@dBRf@X|@`BxCVT`ArAfAlAj@bAbAdAbBnBnAfBVRl@TLJNTR?"
      },
      "average_speed": 2.127,
      "max_speed": 4.093,
      "has_heartrate": true,
      "average_heartrate": 143.7,
      "max_heartrate": 155,
      "elev_high": 171.8,
      "elev_low": 165.4
  },
  {
      "id": 123456790,
      "name": "Afternoon Run",
      "distance": 6013.5,
      "moving_time": 2522,
      "elapsed_time": 2652,
      "total_elevation_gain": 26.6,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-17T13:04:10Z",
      "start_date_local": "2024-01-17T14:04:10Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10575971498",
          "summary_polyline": "chjvG}ar\\q@JiBb@_AFaALaBL_ANcAX]AcDRWEMKGIK[Gg@GkCIs@CQq@yBIwBOw@@k@Kw@AUPoE?k@Gq@[gBa@w@Ic@IeBAmFMaCUwAK]]k@]_@kA_@w@Me@E{@AaADs@Jg@Ba@CgBUo@Dc@CwASs@SiBSkAYSC[@o@G_@@kCEs@HsABm@LyB?m@Lm@RqA~@Wf@SXUf@MTs@r@gAvASt@OfACxADZXv@V^f@h@^Z`@j@h@^LV|@fCl@~BZz@fA|DnA|B\\\\zCdET`ARh@p@pAJNf@b@NXHT^^LVTXZr@b@`@Xb@d@b@\\l@h@f@j@x@`BfB`@p@NPL@h@CVEPOLSvAmDl@kApAsDr@wBf@_C^eAf@cBRa@~AaELYj@}@JIl@UJKl@eAPmC?}@Ku@_@oBK[_@s@I[@iACsADwCGyBSsB[aAKQe@Ue@MiAWgAOg@KM?a@Fc@D{@R_@Bg@EYEa@AsBYk@E]K{B[a@Ok@DGF@Jl@hBbAjEBx@Jv@LhAZhBPzARrAFp@@t@P~@H~CPdABBD?LGXg@f@a@jAg@h@O"
      },
      "average_speed": 2.384,
      "max_speed": 4.272,
      "has_heartrate": true,
      "average_heartrate": 160.8,
      "max_heartrate": 179,
      "elev_high": 173.2,
      "elev_low": 165.2
  },
  {
      "id": 123456790,
      "name": "Morning Run",
      "distance": 7203.9,
      "moving_time": 2701,
      "elapsed_time": 3083,
      "total_elevation_gain": 26.6,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-19T09:15:38Z",
      "start_date_local": "2024-01-19T10:15:38Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10587125467",
          "summary_polyline": "ctjvGs~q\\aAByAVo@CgCNOKO[k@qCYqCYeBGuCK]?_@Oo@Ac@DwAFc@Ry@p@wBV}@Nu@?MIMa@a@u@m@M@u@\\G?IIGYCaA@}@EeA?iBCe@?kAWyBK[S]w@m@YKqAWqAE{@Aq@Fy@Te@AUI]B_@?gAQs@Ag@IgA[_@G_AIo@QMAg@D_@Aa@Ec@IY@UHK@o@GcAMgBTq@Bk@CU@]Hs@@u@FSHa@VSP}@pAo@dA[\\u@h@a@b@Wf@e@lBEv@Dv@x@pBTX~@x@x@nAPZf@lAdElMJRn@bAj@d@TL`@b@RXh@hAx@nCd@`Al@dAv@bAd@h@f@~@nCzCpA~Af@r@`@\\t@dAPHj@@VINKf@}@dBsDv@aCTeAB_@f@qINkAn@qBd@}@f@kAnAkDn@cCn@qCb@{CFs@?qDOoFE_AIk@Ww@W_@a@]a@Sw@YgCQYB_@?i@Bs@PaDCkAM{@OqA_@w@Q}@EiBQa@?YFSRWd@Sz@KhBE|A?d@Fr@Hp@Nj@Nv@Pb@d@xBJp@f@jBh@fC^|@X\\ZVJBBAj@Lv@h@d@j@Rd@J^RbIFt@f@dJJjC@xAPlB@~C@PHTFHHAHCTYj@iAfAcCf@aBx@kBj@aBf@sBV{@Fe@~DkKP_@X]d@It@CPFHDDJAj@Tb@FXDZFbBRtCH|B^vAVf@DFH@zAe@f@Ir@GV@"
      },
      "average_speed": 2.667,
      "max_speed": 5.87,
      "has_heartrate": true,
      "average_heartrate": 161.4,
      "max_heartrate": 183,
      "elev_high": 173,
      "elev_low": 166.2
  },
  {
      "id": 12345679087,
      "name": "Lunch Run",
      "distance": 9042.6,
      "moving_time": 3440,
      "elapsed_time": 3523,
      "total_elevation_gain": 38.6,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-21T10:15:11Z",
      "start_date_local": "2024-01-21T11:15:11Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10600082733",
          "summary_polyline": "ehjvGcar\\kBRyBFm@FyBXwBj@W@WDk@?g@E]Ag@FQIMWSgAUk@Ki@Ew@GoCE{@MeBWk@CIDi@Kw@Aq@N_DEsAMy@]mAa@}@Ek@CCQEIKe@}@aAoAy@y@e@[o@Ky@Ck@@YFgAh@WDUAYK]EWQw@]uDyBc@OUCEC_@k@IQMk@Qe@[mA]eBQUQMUEmAGo@GeB?iCTgAFkACcAJUJeA`AuA~Bk@v@[RQBMKESA[@{@Au@Eu@G]KYOWo@q@i@Y[G[BWCO@[J{@`@OBc@EgB_@GH?FGtEAJCAAE?iEFeDJeCAaADuARgE?m@LqAd@oC@{AHq@Tu@p@qADQ@_@Y}BS}C]iCIaBYcDKw@Aa@QwBYuBKqBIu@Cs@i@qEGKG?oAf@y@LIDILG^BjBDt@@|AHbBNr@f@hAT|@`@rBPr@\\`B`@pCf@xBXtCZzBH`BNrBEpBk@lDIhAWvI?l@CbA?hAKjBKzDCzEBn@Bf@FnCJvBx@vHl@xCr@bDj@pBrAtDd@hAtArC`AhBnApBfB`CjCbCfCvAxBnB`@d@|@r@v@h@h@d@\\`@z@n@l@Rh@^jAj@ZTx@\\bAh@b@Dz@Gv@?r@TrAl@j@^XV\\Tr@h@b@Pp@f@z@d@`@Zt@f@lBdA`@ZRPrBfAr@d@~@Jl@?j@H`@Av@QVIJIBGAMMKI?g@Ve@?e@GKGGUCUEG_@Ec@FW?MCeB_A]Og@Y[[WMq@e@i@We@O]OmA{@]O{@k@c@Ik@]i@w@{@g@gAgBW{AYsA?UBQHS^m@|@uB|@eBd@{Ax@wBbB{Gj@}A"
      },
      "average_speed": 2.629,
      "max_speed": 6.099,
      "has_heartrate": true,
      "average_heartrate": 160,
      "max_heartrate": 176,
      "elev_high": 175,
      "elev_low": 165.2
  },
  {
      "id": 1234567908657,
      "name": "Afternoon Run",
      "distance": 7221.2,
      "moving_time": 3301,
      "elapsed_time": 3333,
      "total_elevation_gain": 25.6,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-23T14:35:28Z",
      "start_date_local": "2024-01-23T15:35:28Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10614121727",
          "summary_polyline": "}hjvG{ar\\_@D_AZ{@PiBL}BVoCf@y@FkBACASUIk@IgEKmAEoAOeBKUYOIWGg@MQOIKAq@Ni@V_@d@Sb@wAjD}AlEYbAMr@WdA}A~Dc@vA}@dCoAxBQRSJQDU@OCa@UwA{Aa@k@]Ue@c@s@eAk@o@eBmBeAmBe@g@[m@W]a@{@IUIm@Sq@Um@Ws@c@e@Y_@o@_@MMk@{@Yq@Om@iAcDm@_CqA{CYi@kAgBm@e@W[}@oBIm@F}ADk@Fc@L_@l@_Af@a@t@_A|A{Bv@w@`Aa@d@KdCS~@CZE`@B\\El@?j@Gr@Fz@Il@J~@@b@JbAFXFTJXHVDlAVnALd@HnAAf@Cf@MjCCn@HfADf@Lb@Pj@^\\XNP`@tAJjADbABTJJVAHHBJFxBXzCPb@z@j@NLNb@AZg@hBOt@U~@_@hAEVKpAOh@KXORMHw@XSTYf@kAnCq@vBi@tA_@hAi@bCYdAoA~CcA~COZoAzBURUDIGEIGOC_@A_AIaBKcA@cAIk@?y@IqAGiBIo@OgBO{CAkAKw@Eu@BgACk@?_@Dq@IqABgAAgAUsAM}AO_AOmAWoAKcAA_@Km@Go@[wAMw@q@yBSsAQg@A[FQVI`@AlANV@f@PjALr@R`AHf@HjAMX@LBHLX~@h@`ATv@R`@p@jBLDTAF@FHDTBFj@NHFBL@h@FNLNPHHH^n@VZZf@`@d@Vh@|@vBNn@JxA@|@"
      },
      "average_speed": 2.188,
      "max_speed": 3.762,
      "has_heartrate": true,
      "average_heartrate": 144.2,
      "max_heartrate": 157,
      "elev_high": 173.6,
      "elev_low": 166.2
  },
  {
      "id": 12345673459087,
      "name": "Afternoon Run",
      "distance": 7756.7,
      "moving_time": 3000,
      "elapsed_time": 3356,
      "total_elevation_gain": 25.4,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-25T14:11:00Z",
      "start_date_local": "2024-01-25T15:11:00Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10627088152",
          "summary_polyline": "shjvG}ar\\oCX{BLiFjAYBqADw@Kg@@MEKMo@oBOq@OqBEaDKs@Uk@Ga@@m@Ga@A[NyEG}@W}ASq@Ug@GYCq@@w@EuABo@G_BCeBIw@Ci@Km@Sq@S[]Qw@S[MeAKy@OO@g@H]Bm@Ae@Ii@?YBi@Le@?gAMqA[g@G}@Wc@CqABYEg@Um@?m@K[Du@AuAGk@Ju@Ey@Fs@Ro@AcBTu@d@g@n@O^c@f@k@`AgAdASZSf@Sp@O`AAt@JjAJXT^p@r@jDhGp@pB`BjF`A|BTZZVl@\\`@d@j@bATZdAjDr@lA`AhBh@h@\\d@h@v@\\n@h@\\x@z@b@r@~CzDJFJBZA\\BH?LKZg@dB}D`@iAb@{APiAJsABqAXgCAUBa@NaAH_@j@yAjBaEPy@j@cB|AuGXaCBo@AeBE}@?{@M}FCSOs@MYIMQSQM}@W{A_@q@C_@@SASDiAD{@LuA?oAKoB]m@Qu@GaBY_@?qBOg@CqA@k@EYAm@Hg@BMBUA[F]Ay@HmABy@LQHm@l@i@r@gBhCw@r@W`@c@fBMfACt@Hb@f@`Aj@x@hBxBz@bBd@rABRtA~Ed@pAhAzBZ`@`@Vb@^VZh@z@^z@j@jBPb@b@p@~@`BRRXl@NJd@r@XXJR~@fA`ApAbE|EhAHj@w@n@kAl@wAj@}A~@sBRm@DE\\yA}AnDJu@FIRMhAiCZeB\\cAd@gA"
      },
      "average_speed": 2.586,
      "max_speed": 5.601,
      "has_heartrate": true,
      "average_heartrate": 164,
      "max_heartrate": 188,
      "elev_high": 173.6,
      "elev_low": 165.2
  },
  {
      "id": 12345672349087,
      "name": "Afternoon Run",
      "distance": 7532.9,
      "moving_time": 3793,
      "elapsed_time": 3889,
      "total_elevation_gain": 20,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-26T12:51:39Z",
      "start_date_local": "2024-01-26T13:51:39Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10633098301",
          "summary_polyline": "whjvGqar\\w@HsAT}AR]BeA@s@Fc@HqA^{AF_@Ai@Ea@HKGIM[eAg@cAMm@Ei@GwBGy@CmBG_@Qa@@_@MgAFy@XkBf@{AP{@ZeAF_@?SQWg@c@c@o@GOQgAA]KkACmACk@GI]CMQE]Am@H_@?KUuAWy@q@o@q@UYOk@@k@K{@Ie@I[?g@HWBsA@[Bc@Ce@Qe@Ew@JW?SNK@{AYsBOmAS]AYEeAAy@By@G_@Bo@?{@Ls@HQ@QCa@DQEKGY]SEiBEg@@cANy@F[Es@Yc@?a@EQEOKG?CDAjAFr@@|ABj@DTVd@DLLxARj@Jb@APGT]f@Qz@BpA^xBDv@H\\Jt@jAnEb@~@h@jBZh@n@`ARl@h@dALb@PZl@fCJVhAzAZVn@XJVPjALh@b@j@n@b@\\p@f@j@Zn@~@p@l@z@H@LE~@g@ZW\\IJANBJF`@^d@p@\\Z`@l@VP`@p@t@t@NFXAb@HRINW|A_Db@gAx@wCNaABq@TkBDaDDk@PeAj@iBxAyCtBuGp@iDZmBBWC]CMUUc@{@_@a@a@w@a@g@m@c@YIs@Ci@Ia@@_@N}@X[RMRMb@M|@WvBYhDMz@c@jAg@|@s@bAMXCRDrCAh@HfAA^DhAH`A@p@^`ED~@Cb@@j@LjB?b@LpB@xBD|@DLF@HCZ_@jByDt@qB^kAj@oAV}@TiAPe@XkAt@aCjA_Dx@mB\\o@VQZKp@IR?FPZpAJJBLB`@Hn@FnALhF\\jDDLDDTBf@M\\@h@Gj@]p@OLQFC`AEv@MrAI|B_@tBETCZI"
      },
      "average_speed": 1.986,
      "max_speed": 6.753,
      "has_heartrate": true,
      "average_heartrate": 143,
      "max_heartrate": 152,
      "elev_high": 174.6,
      "elev_low": 166.6
  },
  {
      "id": 12344757483,
      "name": "Lunch Run",
      "distance": 10221.1,
      "moving_time": 3345,
      "elapsed_time": 3804,
      "total_elevation_gain": 24.8,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-28T10:28:58Z",
      "start_date_local": "2024-01-28T11:28:58Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10645853039",
          "summary_polyline": "ihjvGkar\\wB\\y@HyARaAHq@Ho@NgA\\UB]LU?qAQi@@OCQWKi@U}DGYWi@CKJi@A_@O{@MqACIMSI_@Bc@MkCMlAI\\KPMHe@HkCt@gAx@a@j@Yd@[|@]~AYjDM~@IjAUjBo@vCwApDg@`AY`@_@XUDQCs@Wa@a@o@}@}@{@{AcB[e@s@u@_AmAm@cA[Yo@aAsAeCOi@QmA_@_Am@}@{AqAw@{AqAoD{@oC[kAi@mAa@{@[c@Wc@]c@o@q@]e@Wg@Uu@Ks@Aw@@c@BYXoAJYn@u@v@u@\\a@r@kAlFqC~@InDITC~BAx@@rBN~Cd@|@FdARf@NXBhAFhBI|@GvBB~ARjAVJFb@ZHJ^|@VjBJbDDrDHbCJh@ZfAJh@L|@Dt@@j@Cj@G|@S`BM^IPOLq@XIFY\\a@x@kD|Ic@vA[|AYbA{ChIeAlBe@n@OLWFa@BSGWS}AuB}@u@QQU[q@o@]k@}@eAy@eAU[MYy@_Aa@o@k@uAm@eCe@iAU]_@e@iA_Ak@y@o@{A}AaFWaAyAoDm@eA_A_Am@w@S_@e@kAMu@Am@LkAVgAJYLUX]pAkAbAcB`AiAT_@JIPIz@K~AIlGUfBAx@@zDZrBb@r@ZpANx@Hf@?dBM|@MbAC`@DhAX`AL|@ZPLNL`@|@Ll@DXP|CDfEJjDXbAj@`CDb@CjCYpBKb@O\\ULk@RWPKNc@~@gB|EsAxCUx@i@`CyBpGs@lBiAnB]^UJSDs@?IGc@k@aA_AuAeBa@a@_@i@m@o@o@{@YYi@w@eBqC{@eBg@mBu@{Ai@u@uAoA_@o@o@aBmAoDmA{D]}@i@cAi@w@uBgC[q@Ou@Co@@i@Fs@Lk@d@mAV_@zA{Ah@_An@{@fAaA\\K~BYfFMZEj@Cp@?NJ@L_@rB"
      },
      "average_speed": 3.056,
      "max_speed": 9.666,
      "has_heartrate": true,
      "average_heartrate": 164.3,
      "max_heartrate": 184,
      "elev_high": 172.8,
      "elev_low": 165.8
  },
  {
      "id": 12345345679087,
      "name": "Morning Run",
      "distance": 8127.6,
      "moving_time": 3601,
      "elapsed_time": 3894,
      "total_elevation_gain": 31.6,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-30T09:54:00Z",
      "start_date_local": "2024-01-30T10:54:00Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10659281543",
          "summary_polyline": "yhjvGwar\\yA\\eCJ{@JkF|@YPKBcDPU?CQAy@FmBFiAAk@E_@Y[SYWeAIm@CgAWaABk@I{@FgBDk@j@sAf@_BR}@@]GQm@m@m@{@GOIa@MqAOoDEKY?EIYgEQm@GM]c@c@a@k@Mm@I_@CqASi@?s@I_BReA@[E{@Sg@Gm@J_@RU@SAs@U}ASSGWMYGy@GU?c@DoAIy@@a@Ci@Fc@@kATy@Lk@?SI_@_@YKS?u@KY?aBNi@AY@g@Gs@Qu@EcAWu@Gw@T[RQDg@Ey@Wq@?E@CJC|ECPABAAG}@?oCLwC@kAJw@Eu@NoFDw@H]Ag@LeBf@kC?yAHw@Xu@p@gAF_@?q@OuAGSWiBWiEY{BEy@WaBKoAWaCKsAGsBOyB_@}BQu@CGGEULYTQDiALMEC@CFF|@Ct@FrA@tBFlA|@hDVj@Nf@L`ARr@Lv@V`ARrAf@rBDp@Lz@Hv@DhALn@PnB@`@LxACfBm@`DOxA@l@K`BE`CGpA@lAM~BSjJBvCBt@Fv@BzBR|C`@fDHfA~AxHTl@T|@h@hB`@x@Rh@hB~DhAzBr@~@d@z@`@f@\\l@VR`@f@TRRThCnBp@VPJf@d@p@v@j@b@p@r@n@`@`AdAt@d@l@f@^Pj@Tt@p@p@Rf@d@n@Jj@b@XJZBVIh@Ab@Ij@F`@Ph@^fAf@zCbCv@j@v@`@VD\\N^^v@\\b@d@h@R|@t@t@`@PN^TtAVfA?^HP@VQfAWb@]BsABMjC]HEJ_@@c@YyAGk@GeB@M@AfAIpAMlAYr@@jAYpBYLE"
      },
      "average_speed": 2.257,
      "max_speed": 5.794,
      "has_heartrate": true,
      "average_heartrate": 144.5,
      "max_heartrate": 161,
      "elev_high": 175.4,
      "elev_low": 165.8
  },
  {
      "id": 12345897679087,
      "name": "Afternoon Run",
      "distance": 8037.6,
      "moving_time": 2973,
      "elapsed_time": 3305,
      "total_elevation_gain": 30.6,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-01-31T14:25:14Z",
      "start_date_local": "2024-01-31T15:25:14Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10668053737",
          "summary_polyline": "gijvGqar\\uBf@cBTyCVuB^m@CmCVKAQWKWGo@IuBKkAGQW_@Kg@GwBIcAQc@CO@i@Ik@AY@i@NcB^}@Lc@r@yCBa@KUo@i@k@q@Ma@Gi@Eg@KQ_@UOYE_@CkA?g@EaAI{@Ey@Kg@Wa@{@o@]QWGaAMYG]EUDg@Ak@Fi@@{@Fm@Ae@Dc@E{AWe@AuAa@kAKqAE_@Im@@eAOyADqAKm@H_BJ}@G_CVk@T]V_@\\]n@_@h@o@hAi@j@i@^STOZU|@Ox@Eb@AXB\\Nx@zFtJj@pAb@bBl@pBZ|@d@bAx@vAZT`@PVRt@dAZl@b@bBd@jAt@lAXh@hA~A~@zA~@~@p@~@f@f@RZZ`@b@b@|ArBVNF@T@`@ILGPUh@cAxAkDz@cCr@eBd@aBl@cCzB}Gl@yAZq@b@m@TOj@IFGR]Jk@Hw@HoBAoAO}Ao@mBIc@Aq@OoCBeA?}AImCIs@Ma@]o@WWo@Y}@OaBUmA?YD]AWLUF{@GoA@yBUyCo@y@Oe@CS?_BEi@K[?QD[Bk@IYAaBFu@AwEb@y@ZSNMR]b@c@bAo@z@oAnAY`@c@`AS`ACp@?d@BTRp@\\v@t@~@^\\PJ^`@^t@Xz@Zj@jApE`@tAr@hBf@dAn@|@b@ZLDLHh@l@T\\\\x@Px@l@dBdAhBh@r@|AbC`ArAd@h@BADDZd@d@d@tAlBjAnATRVFZBNATIV[p@sAfBiEdDoLnD}Iv@yANSXGl@IR?RFJPCX@LR`@Jj@LbDJbAH^ZjA\\fCNh@HDLCnBi@"
      },
      "average_speed": 2.704,
      "max_speed": 5.738,
      "has_heartrate": true,
      "average_heartrate": 157.5,
      "max_heartrate": 184,
      "elev_high": 172.8,
      "elev_low": 165.8
  },
  {
      "id": 123456767899087,
      "name": "Lunch Run",
      "distance": 10015.5,
      "moving_time": 3849,
      "elapsed_time": 4364,
      "total_elevation_gain": 31.2,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-02-03T10:05:48Z",
      "start_date_local": "2024-02-03T11:05:48Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10686608345",
          "summary_polyline": "ijjvGoar\\[By@NoBZsAPgDl@m@Be@?}@I{@CMEIMIYGe@A_A?}CQqAK_CEQUSe@k@Ce@Ia@?]JwAJmCMuAgAcDIy@EkC@iAAoBGyAOqAGYYaAIMKK}@a@uAWgAMe@Cy@Dk@Ci@HeBFoACkAQ_@Cy@Qc@Qi@Ig@CWIOAY@m@Kw@Am@Ge@Fc@CcAIe@Dg@@m@HqAFqAN}@Be@Ha@Tu@r@k@x@i@hAY\\i@b@w@jASr@UrA?\\@d@Jx@Tj@b@n@j@f@jBtCf@nA|@zCf@tAp@pBf@lAZp@\\h@XZv@j@h@r@Zj@\\t@b@bBl@nAlB|C`BzBdArA~CdDfAxAd@f@VDXCf@QNQzA}CjAeDXgALkAZ_GZsCf@cB|AqD`AwCRi@XaApAqGJ}@D}B?eAGgCOcD?_@CSY_Ac@o@]WqAc@w@KgAGu@?i@Fi@Bc@F}@Dw@Gs@C}@KgCo@qCe@]Cw@Bi@GmACaBCc@DyADsAPgABm@DaAZu@p@a@h@c@n@c@`Ag@d@m@d@_@f@Sn@CRSx@CX?fADXFVN^p@hAlBxBh@|@fAxCX|@^|Aj@hBz@rBh@`A\\^d@Zh@f@j@v@\\x@j@vBXp@`@l@f@h@Zl@P`@X\\\\l@r@r@xAnB^f@~AdBb@j@j@|@TTLH\\B^EVKNOXg@tA{Cr@eB`@cBJ{@LiCd@cG^wAdCyFp@yB|@qDb@{BHk@P{@B_@Ao@DkAGaHEcAGc@O}@Su@SW[S}@We@Oc@Kq@I_AAoADc@JSH@D\\VX`@`CtFb@HHHNVh@RHR@l@DJt@z@f@r@d@b@lBxD^fBDz@?rBUjC@XHp@Ed@BHVXH`@NpCGdBDFl@d@F~CFh@L\\FFN@TE`A[zAO`@B~@?rBMdCe@vBWdA[j@C"
      },
      "average_speed": 2.602,
      "max_speed": 6.162,
      "has_heartrate": true,
      "average_heartrate": 156.6,
      "max_heartrate": 179,
      "elev_high": 173,
      "elev_low": 165.8
  },
  {
      "id": 12342345675679087,
      "name": "Lunch Run",
      "distance": 7001.7,
      "moving_time": 3034,
      "elapsed_time": 3069,
      "total_elevation_gain": 24,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-02-07T10:19:34Z",
      "start_date_local": "2024-02-07T11:19:34Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10713694892",
          "summary_polyline": "_jjvGwar\\k@Po@JaCHo@HoAVoBh@m@DeAAqAJGAKKG[Gi@I_DKsAI}CEw@Oe@[IW[Qw@EY@c@LgAHiACcBEe@WgAm@aB?KD]@]CgABgACiCIyBGu@MiA[gAW[i@a@[I_@Q_AEqAQsAEq@?o@HmAFUC}@SQ?SEw@AKDQTQ?s@Ms@SKGu@?s@GS?sBQU@s@Em@AM@y@EWB_@JqADk@JW@k@I][KGKAyBCaAFiAD[CkAYcAMUGGBCb@@b@Ab@DjAHvA\\xAZfBRj@CZc@~@Ml@Et@@Xh@tCTtBPr@Lp@f@bB^dAf@jANn@Zj@b@p@r@hBR^VbAXt@T~@Tj@fAtARJZHPRL^Lv@L`@t@v@j@t@\\\\zAvB|@|@|@p@tArAh@V?KQm@[e@KUOi@?OFQDE\\OH?NBTJp@|@ZXX^XRr@jAb@f@`@\\f@JP?REZUTIfAuB\\i@d@mAj@eBb@_Cf@cB^gC\\u@pA}Cv@cCn@uAZc@RQfAc@JQHW^_DlAgEJi@BWGOs@q@_@i@[aAGq@A_AMkCCEECS?GCIIEKe@uDUq@SYKIUKk@Qe@YIIAI@IDC`AFZHXNZZT\\L\\Jd@Hl@NhCL`EBH`@VFHDPB`@\\dAX^\\`@\\l@@JGZ]fAeAbEOlAEp@BPNXBJKb@AXBLZf@DZXbIVbEDDZ@b@CzAg@h@Ib@C~A?pBMpB_@xCUbAU"
      },
      "average_speed": 2.308,
      "max_speed": 4.05,
      "has_heartrate": true,
      "average_heartrate": 153,
      "max_heartrate": 162,
      "elev_high": 173.8,
      "elev_low": 167.2
  },
  {
      "id": 1234567934567087,
      "name": "Afternoon Run",
      "distance": 8587.5,
      "moving_time": 3241,
      "elapsed_time": 3544,
      "total_elevation_gain": 32.2,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-02-08T14:45:59Z",
      "start_date_local": "2024-02-08T15:45:59Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10721784011",
          "summary_polyline": "gkjvG{`r\\s@JaBDg@DoAXmALcAVc@DqAEaBNc@IGCIMMm@QeCGwAEyBOkAEy@Sw@@g@Ii@?UBi@PgBfAoETu@BWISo@m@k@_AEOGe@Aw@M]CCSBKAQWGm@CmAI_BKmAQcAKWc@m@GI]Q_AYgAQa@C{@Ag@H}A?g@DUFiAEc@CaASm@E[I]Ea@Mk@@]Kg@?YGa@Es@BYEc@BqA]cADs@LmABa@CYFyA@_AHYFSFYR_@`@q@z@u@vASTmA~@UZUp@YhAE\\Ch@Dr@BXHXZr@h@p@L`@?RWlBCbAJx@?hA@RdA|CXj@p@fAt@|AN^Pr@N\\JRDB@AP[J[HCH@JAVSNGL?ZDTCJ@d@Th@l@hAdBPl@Ht@Nl@`KxNf@`@lBfC\\`@HHXHd@A^GROXg@|@_C`@s@b@mARo@P_ABYR_Bf@_HPmAHa@bAiC~@uBXw@`A_D\\yAx@mEPqAAwACKG{@BeBEuA?y@MqBMu@]y@a@]gA]k@Ky@KkACqADc@Ju@?e@Bk@CoD_@_Dm@uAOW?k@DcAQSASBk@EgAHiB?qADg@HuADo@Lm@RKF[j@UVOXWZSb@MRa@`@KNq@l@c@n@_@lAMn@Cr@@f@Lp@j@dAbBlB^XXd@xA`E`AdD~@xCN^bAjBf@^NFRP`AlAl@rAj@nBv@`Bp@dAj@n@r@nAj@t@d@\\Xd@`BnBxAlBbAbATJb@@`@GJGPSXi@p@yANg@Ve@Z_A`@wARoAhAuLRy@r@cB\\mAb@y@\\aAdAkDXeAx@cFJ{A?eAAL|AfKEtBMzA?V@PHRDVC`@@HLZLt@HxCJjARjEFt@H^DDJ?vBu@fAIT?d@FbAEZGp@S"
      },
      "average_speed": 2.65,
      "max_speed": 5.79,
      "has_heartrate": true,
      "average_heartrate": 158.9,
      "max_heartrate": 185,
      "elev_high": 173.2,
      "elev_low": 166.2
  },
  {
      "id": 12345346679087,
      "name": "Afternoon Run",
      "distance": 8017.4,
      "moving_time": 3624,
      "elapsed_time": 3693,
      "total_elevation_gain": 18.4,
      "type": "Run",
      "sport_type": "Run",
      "start_date": "2024-02-12T14:12:43Z",
      "start_date_local": "2024-02-12T15:12:43Z",
      "timezone": "(GMT+01:00) Europe/Paris",
      "location_city": null,
      "location_state": null,
      "location_country": "France",
      "map": {
          "id": "a10747253894",
          "summary_polyline": "khjvG{ar\\IPQDmAD{BT_Ef@qAV_AD[JsBDSCI_@Go@Cs@AuAEw@IQUUGMQ}@QyAIkASw@?SH]@KOUCSBc@TiBJk@Ro@z@kDBO?MMUe@e@g@o@Sa@E[@y@OwAI}BCE_@FS]Is@Cu@EWg@iBGK_@UcA[YMMCgBQo@F]CGAOWIGkBJ]?WA[Ma@EK?]Bi@AQBQPIFUB_A[gA[WAUBa@Ee@K_@Ca@E[Ci@Do@I}@Ba@Ak@Fu@B]H]@i@NU@k@MY_@UIy@Ek@Hg@BSAe@Fa@Gg@JUCo@U}@So@MKBCPB~@Ct@LzBFb@Rn@b@dCNb@?LCN]v@Mf@Gt@@h@L~@ZvABn@H|@h@rBb@fAf@pBb@|@Vp@x@pANh@\\r@Nf@Rh@p@bCTf@dAxAZTd@NNLHVPhAN^pA|A~@zAf@j@RNzBxBn@t@l@d@`@RAMSq@q@uAE]DQHGh@MLBHBz@|@ZPLTbBzB`Az@HBx@ARINMxA}C`A{BzBsGXcBx@gCpCkH\\s@Za@\\Op@QJIDKPs@NuB|@{C^aBD_@GSeAkA[e@EOEUBWAc@Q{A@m@I}@GIUAKEOUG]MaBO}@Oa@e@q@c@O]ISCk@CkAWcAAe@D_@Aw@HmACc@?gACK?QISCu@Gy@Sq@C]ImAIGBAHHZPx@Rj@RdATr@Hd@B^BFHFTMXDRJPPd@XZLj@f@d@Lx@^RDTRbAHtAk@r@ML?r@Jp@B`@Fb@Vf@f@\\t@n@v@j@~@HDDI?QOwC@cAHWNK^CHDNrCDV@`@Nr@HPZT`@j@Zt@BLE^m@hBy@dDOvAAj@@XJ`@?^\\|@@h@PvCPzEPtCBLBDHBLCb@i@JGd@Id@U^Gh@GjADh@AhBc@lDa@nAK"
      },
      "average_speed": 2.212,
      "max_speed": 3.348,
      "has_heartrate": true,
      "average_heartrate": 144.3,
      "max_heartrate": 151,
      "elev_high": 172.8,
      "elev_low": 167.2
  }
]
