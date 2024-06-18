import axios from "../api/axios";
import { ACCOUNT_LOGIN, ACCOUNT_LOGIN_GOOGLE } from "../constants/API_URLS";
import { ROLE, STATUS } from "../constants/consts";
import { LOGIN_SUCCESS } from "../message/authen/Login";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "./authSlice";

//Authentication
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/login", user);
        if (res.data.message != LOGIN_SUCCESS) {
            return res.message;
        } else {
            if (res.data) {
                if (res.data.data.roleName === ROLE.admin) {
                    console.log(res.data.data);
                    dispatch(loginSuccess(res.data.data));
                    navigate('/');
                } else {
                    if (res.data.message == STATUS.active) {
                        dispatch(loginSuccess(res.data.data));
                        navigate('/');
                    }
                    else {
                        return res.data.message;
                    }
                }
            } else {
                return res.message;
            }
        }
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const loginUserByGoogle = async (result, dispatch, navigate, isRegister) => {
    dispatch(logoutStart());
    console.log(result.user.accessToken);
    try {
        const res = await axios.post(ACCOUNT_LOGIN_GOOGLE, {
            "token": result.user.accessToken
        });
        await console.log(res);
        await dispatch(loginSuccess(res.data.data));
        if (isRegister) {
            navigate("/update-candidate")
        } else {
            navigate('/')
        }
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess(null));
        navigate("/");
    } catch (err) {
        dispatch(logoutFailed());
    }
}

// //Candidate


// export const adminRegisterCandidate = async (newUser, navigate) => {
//     try {
//         const res = await axios.post("/candidate/create", newUser)
//         navigate("/")
//         console.log(res)
//     } catch (error) {
//         return error
//     }
// }

// export const registerCandidate = async (newUser, navigate, dispatch) => {
//     try {
//         await axios.post("/account/auth/registerForCandidate", newUser)
//         loginUser(newUser, dispatch, navigate, true);
//     } catch (error) {
//         return error
//     }
// }

// export const updateCandidate = async (id, navigate, data, dispatch, specialties) => {
//     dispatch(userStart());
//     try {
//         const res = await axios.put(`/candidate/update?id=${id}`, data)
//         dispatch(userSuccess(res.data));
//         addSpecialtiesCandidate(id, specialties)
//         navigate("/");
//     } catch (err) {
//         dispatch(userFailed())
//     }
// }

// export const getCandidateBySpecialtyId = async (id) => {
//     try {
//         const res = await axios.get(`/canspec/getListCansWithSpec?specId=${id}`)
//         return res.data.candidates
//     } catch (error) {
//         return error
//     }
// }

// export const getCandidateById = async (id) => {
//     try {
//         const res = await axios.get(`/candidate/getCandidateByID?id=${id}`)
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

// export const getAllCandidates = async () => {
//     try {
//         const res = await axios.post("/candidate/getAll")
//         console.log(res)
//     } catch (error) {
//         return error
//     }
// }

// export const getCandidateByListSkill = async (params) => {
//     try {
//         const res = await axios.get(`/candidate/getListCandidateBySkill?${params}`)
//         console.log(res);
//         return res
//     } catch (error) {
//         return error
//     }
// }

// export const getListCandidateAssign = async (params) => {
//     try {
//         const res = await axios.post(`/assign/getRecruitmentRequestById/{id}?requestId=${params}`)
//         console.log(res);
//         return res
//     } catch (error) {
//         return error
//     }
// }

// export const addSpecialtiesCandidate = async (id, specialties) => {
//     try {
//         specialties.forEach(async specialty => {
//             console.log(specialty.id)
//             const res = await axios.post("/candidate-level/create", {
//                 candidateId: id,
//                 specialtyId: specialty.id
//             })
//             console.log(res)
//         });
//     } catch (error) {
//         return error
//     }
// }

// export const getCandidateCourseProcessing = async () => {
//     try {
//         const res = await axios.get(`/candidate-course/getListCandidateCourseByStatusPROCESSING`)
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

// //Skill
// export const getAllSkill = async () => {
//     try {
//         const res = await axios.get("/skill/getAllPaging")
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

// //Specialty

// export const getAllSpecialtyExperience = async () => {
//     try {
//         const res = await axios.get("/specialty-experience/getAllDetailSpecialty")
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

// export const getAllSpecialtyWithoutExperience = async (id) => {
//     try {
//         const res = await axios.get(`/specialization/getDetailSpecializationWithoutExperience?specialtyId=${id}`)
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

// export const getSpecialties = async () => {
//     try {
//         const res = await axios.get("/specialty/getAll")
//         console.log(res.data);
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

// export const getSpecialtiesDetail = async () => {
//     try {
//         const res = await axios.get("/specialty/getAll")
//         return res.data;
//     } catch (error) {
//         return error
//     }
// }

// export const getSpecialtiesByCandidateId = async (id) => {
//     try {
//         const res = await axios.get(`/canspec/getListSpecsWithCan/${id}`)
//         return res
//     } catch (error) {
//         return error
//     }
// }

// // Experience
// export const getExperience = async (id) => {
//     try {
//         const res = await axios.get(`/findById?id=${id}`)
//         return res.data.name
//     } catch (error) {
//         return error
//     }
// }

// //Course

// export const getCandidateCourses = async (id) => {
//     try {
//         const res = await axios.get(`/status-candidate-course/getListCourseByCandidateId?id=${id}`)
//         return res
//     } catch (error) {
//         return error
//     }
// }

// export const startCourse = async (params) => {
//     try {
//         const res = await axios.post('/status-candidate-course/create', params)
//         return res.data.message
//     } catch (error) {
//         return error
//     }
// }

// export const submitCertificate = async (params) => {
//     try {
//         const res = await axios.put('/status-candidate-course/updateCertificate', params)
//         console.log(res.data.message)
//         return res.data.message
//     } catch (error) {
//         return error
//     }
// }

// //Employee

// export const getAllEmployee = async () => {
//     try {
//         const res = await axios.get("/employee/getAllEmployees")
//         console.log(res.data.responseList)
//     } catch (error) {
//         return error
//     }
// }

// export const getAllEmployees = async () => {
//     try {
//         const res = await axios.get("/employee/getAllEmployees")
//         return res.data.responseList.filter((e) => e.position.name === "PROFESSOR");
//     } catch (error) {
//         return error
//     }
// }

// //Enterprise

// export const registerEnterprise = async (newUser, navigate) => {
//     try {
//         console.log(newUser);
//         const res = await axios.post("/account/auth/registerForEnterprise", newUser);
//         navigate("/")
//     } catch (error) {
//         return error
//     }
// }

// export const getAllEnterprise = async () => {
//     try {
//         const res = await axios.post("/enterprise/getAll")
//         console.log(res)
//     } catch (error) {
//         return error
//     }
// }

// export const updateEnterprise = async (id, request) => {
//     try {
//         const res = await axios.put(`/enterprise/update?id=${id}`, request)
//         return res.data.status;
//     } catch (error) {
//         return error
//     }
// }
// //Post

// export const createPost = async (params, navigate) => {
//     try {
//         const res = await axios.post('/recruitmentRequest/create', params).then((res) => {
//             if (res.data.status === "SUCCESS") {
//                 navigate(`/post-detail/${res.data.id}`);
//             }
//         })
//         return res
//     } catch (error) {
//         return error
//     }
// }

// export const getListPostByEnterpriseId = async (id) => {
//     try {
//         const res = await axios.get(`/recruitmentRequest/getByCreator?id=${id}`)
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

// export const getPostByPostId = async (id) => {
//     try {
//         const res = await axios.get(`/recruitmentRequest/getById?id=${id}`)
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

// export const getAllPost = async () => {
//     try {
//         const res = await axios.get("/recruitmentRequest/getAll?pageNo=0&pageSize=40")
//         return res.data.responseList
//     } catch (error) {
//         return error
//     }
// }

// //Assign

// export const getApply = async (params) => {
//     try {
//         const res = await axios.get(`/apply/getById/{id}?id=${params}`)
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

// export const assignCandidates = async (params) => {
//     try {
//         const res = await axios.post("/apply/create", params)
//         return res.status
//     } catch (error) {
//         return error
//     }
// }

// export const getAllAssign = async () => {
//     try {
//         const res = await axios.post("/assign/getAll")
//         console.log(res.data);
//         return res
//     } catch (error) {
//         return error
//     }
// }

// export const confirmAssign = async (id, candidateId) => {
//     try {
//         const res = await axios.put(`/assign/approvedByCandidate/{id}?id=${id}&candidateId=${candidateId}`)
//         return res.data.status;
//     } catch (err) {
//         return err
//     }
// }

// export const getListAssignByCandidateId = async (params) => {
//     try {
//         const res = await axios.get(`/assign/getListAssignByCandidateId?candidateId=${params}`)
//         return res
//     } catch (error) {
//         return error
//     }
// }

// export const getCandidatesConfirmed = async (params) => {
//     try {
//         const res = await axios.get(`/assign/getListCandidateConfirmByRRId?recruitment_request_id=${params}`)
//         return res
//     } catch (error) {
//         return error
//     }
// }

// export const approveCandidate = async (params) => {
//     try {
//         const res = await axios.get(`/assign/approvedAssignEnterprise?id=${params}`)
//     } catch (error) {
//         return error
//     }
// }

// export const rejectCandidate = async (assignId, candidateId) => {
//     try {
//         const res = await axios.put(`/assign/rejectedByCandidate/{id}?id=${assignId}&candidateId=${candidateId}`)
//     } catch (error) {
//         return error
//     }
// }

// export const getAllAssignApproved = async () => {
//     try {
//         const res = await axios.get("/assign/getListCandidateAPPROVE")
//         return res.data
//     } catch (error) {
//         return error
//     }
// }

// //New Candidate

// export const getAllNewCandidateUnCheck = async () => {
//     try {
//         const res = await axios.get("/waiting-list/getAllStatusByUnCheck");
//         return res.data;
//     } catch (error) {
//         return error
//     }
// }

// // Interview

// export const updateInterviewDone = async (id) => {
//     try {
//         const res = await axios.put(`/updateInterviewToDone?interviewID=${id}`);
//         return res.data.status;
//     } catch (error) {
//         return error
//     }
// }

// export const updateInterviewCancel = async (id) => {
//     try {
//         const res = await axios.put(`/updateInterviewToCancel?interviewID=${id}`);
//         return res.data.status;
//     } catch (error) {
//         return error
//     }
// }

// export const getAllInterview = async () => {
//     try {
//         const res = await axios.get("/getAllInterview");
//         return res.data.responseList;
//     } catch (error) {
//         return error
//     }
// }

// // Contract

// export const getAllContract = async () => {
//     try {
//         const res = await axios.get("/contract/getAllContract");
//         console.log(res)
//         return res.data.responseList;
//     } catch (error) {
//         return error
//     }
// }

// // Statistic

// export const getCandidateStatistic = async () => {
//     try {
//         const res = await axios.get("/statistic/statisticCandidatesBySpecialty");
//         return res.data;
//     } catch (error) {
//         return error
//     }
// }