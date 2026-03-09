// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import * as DocumentPicker from "expo-document-picker";
// import { useRouter } from "expo-router";

// export default function BabysitterRegistrationForm() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const totalSteps = 3;

//   const [skillInput, setSkillInput] = useState("");
//   const [certificateInput, setCertificateInput] = useState("");

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     birthDate: "",
//     age: "",
//     email: "",
//     phone: "",
//     location: "",

//     presentation: "",
//     experience: "",

//     skills: [] as string[],
//     certificates: [] as string[],

//     criminalRecordPhoto: null as any,
//     idPhoto: null as any,
//     facePhoto: null as any,
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   // seleccionar imagen galería
//   const pickImage = async (field: string) => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setFormData({
//         ...formData,
//         [field]: result.assets[0],
//       });
//     }
//   };

//   // tomar selfie con cámara
//   const takeSelfie = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();

//     if (!permission.granted) {
//       alert("Se necesita permiso para usar la cámara");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       cameraType: ImagePicker.CameraType.front,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setFormData({
//         ...formData,
//         facePhoto: result.assets[0],
//       });
//     }
//   };

//   // subir documento
//   const pickDocument = async () => {
//     const result = await DocumentPicker.getDocumentAsync({});

//     if (result.assets) {
//       setFormData({
//         ...formData,
//         criminalRecordPhoto: result.assets[0],
//       });
//     }
//   };

//   const addSkill = () => {
//     if (!skillInput) return;

//     setFormData({
//       ...formData,
//       skills: [...formData.skills, skillInput],
//     });

//     setSkillInput("");
//   };

//   const addCertificate = () => {
//     if (!certificateInput) return;

//     setFormData({
//       ...formData,
//       certificates: [...formData.certificates, certificateInput],
//     });

//     setCertificateInput("");
//   };

//   const handleNext = () => {
//     if (step < totalSteps) setStep(step + 1);
//     else router.replace("/login");
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//     else router.back();
//   };

//   return (
//     <View style={styles.container}>
//       {/* HEADER */}

//       <LinearGradient
//         colors={["#886BC1", "#FF768A"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.header}
//       >
//         <View style={styles.headerRow}>
//           <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
//             <Ionicons name="arrow-back" size={20} color="white" />
//           </TouchableOpacity>

//           <View>
//             <Text style={styles.headerTitle}>Registro de Niñera</Text>
//             <Text style={styles.headerSubtitle}>
//               Paso {step} de {totalSteps}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.progressBg}>
//           <View
//             style={[
//               styles.progressFill,
//               { width: `${(step / totalSteps) * 100}%` },
//             ]}
//           />
//         </View>
//       </LinearGradient>

//       <ScrollView contentContainerStyle={styles.content}>
//         {/* STEP 1 */}

//         {step === 1 && (
//           <>
//             <View style={styles.card}>
//               <Text style={styles.cardTitle}>Información Personal</Text>

//               <Text style={styles.label}>Nombres</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="person-outline" size={18} color="#9CA3AF" />
//                 <TextInput
//                   placeholder="Tu nombre"
//                   style={styles.input}
//                   onChangeText={(v) => handleInputChange("firstName", v)}
//                 />
//               </View>

//               <Text style={styles.label}>Apellidos</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="person-outline" size={18} color="#9CA3AF" />
//                 <TextInput
//                   placeholder="Tus apellidos"
//                   style={styles.input}
//                   onChangeText={(v) => handleInputChange("lastName", v)}
//                 />
//               </View>

//               <View style={styles.row}>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.label}>Fecha de nacimiento</Text>
//                   <View style={styles.inputContainer}>
//                     <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
//                     <TextInput
//                       placeholder="DD/MM/AAAA"
//                       style={styles.input}
//                       onChangeText={(v) => handleInputChange("birthDate", v)}
//                     />
//                   </View>
//                 </View>

//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.label}>Edad</Text>
//                   <View style={styles.inputContainer}>
//                     <TextInput
//                       placeholder="25"
//                       keyboardType="numeric"
//                       style={styles.input}
//                       onChangeText={(v) => handleInputChange("age", v)}
//                     />
//                   </View>
//                 </View>
//               </View>

//               <Text style={styles.label}>Correo electrónico</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
//                 <TextInput
//                   placeholder="tu@email.com"
//                   style={styles.input}
//                   onChangeText={(v) => handleInputChange("email", v)}
//                 />
//               </View>

//               <Text style={styles.label}>Teléfono</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="call-outline" size={18} color="#9CA3AF" />
//                 <TextInput
//                   placeholder="+504 8899 8899"
//                   style={styles.input}
//                   onChangeText={(v) => handleInputChange("phone", v)}
//                 />
//               </View>

//               <Text style={styles.label}>Ubicación</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="location-outline" size={18} color="#9CA3AF" />
//                 <TextInput
//                   placeholder="Ciudad, País"
//                   style={styles.input}
//                   onChangeText={(v) => handleInputChange("location", v)}
//                 />
//               </View>
//             </View>

//             {/* DOCUMENTOS */}

//             <View style={styles.card}>
//               <Text style={styles.cardTitle}>
//                 Verificación biométrica y documentos
//               </Text>

//               <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
//                 <Ionicons name="document-outline" size={26} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {formData.criminalRecordPhoto
//                     ? formData.criminalRecordPhoto.name
//                     : "Antecedentes penales"}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.uploadBox}
//                 onPress={() => pickImage("idPhoto")}
//               >
//                 <Ionicons name="image-outline" size={26} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {formData.idPhoto ? "Documento cargado" : "Foto de identidad"}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.uploadBox} onPress={takeSelfie}>
//                 <Ionicons name="camera-outline" size={26} color="#999" />
//                 <Text style={styles.uploadText}>
//                   {formData.facePhoto ? "Selfie cargada" : "Tomar selfie"}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}

//         {/* STEP 2 */}

//         {step === 2 && (
//           <>
//             <View style={styles.card}>
//               <Text style={styles.cardTitle}>Presentación</Text>

//               <TextInput
//                 placeholder="Cuéntanos sobre ti, tu experiencia y por qué te apasiona cuidar niños..."
//                 multiline
//                 style={styles.textArea}
//                 onChangeText={(v) => handleInputChange("presentation", v)}
//               />
//             </View>

//             <View style={styles.card}>
//               <Text style={styles.cardTitle}>Experiencia</Text>

//               <TextInput
//                 placeholder="Describe tu experiencia profesional..."
//                 multiline
//                 style={styles.textArea}
//                 onChangeText={(v) => handleInputChange("experience", v)}
//               />
//             </View>

//             <View style={styles.card}>
//               <Text style={styles.cardTitle}>Habilidades</Text>

//               <View style={styles.row}>
//                 <TextInput
//                   placeholder="Ej: Primeros auxilios"
//                   style={styles.input}
//                   value={skillInput}
//                   onChangeText={setSkillInput}
//                 />

//                 <TouchableOpacity style={styles.addBtn} onPress={addSkill}>
//                   <Text style={styles.addBtnText}>Agregar</Text>
//                 </TouchableOpacity>
//               </View>

//               {formData.skills.map((skill, i) => (
//                 <Text key={i} style={styles.tag}>
//                   {skill}
//                 </Text>
//               ))}
//             </View>
//           </>
//         )}

//         {/* STEP 3 */}

//         {step === 3 && (
//           <>
//             <View style={styles.card}>
//               <Text style={styles.cardTitle}>Certificados</Text>

//               <Text style={{ color: "#6B7280", marginBottom: 10 }}>
//                 Agrega tus certificaciones profesionales (RCP, primeros auxilios,
//                 educación infantil, etc.)
//               </Text>

//               <View style={styles.row}>
//                 <TextInput
//                   placeholder="Ej: Certificado en RCP"
//                   style={styles.input}
//                   value={certificateInput}
//                   onChangeText={setCertificateInput}
//                 />

//                 <TouchableOpacity
//                   style={styles.addBtn}
//                   onPress={addCertificate}
//                 >
//                   <Text style={styles.addBtnText}>Agregar</Text>
//                 </TouchableOpacity>
//               </View>

//               {formData.certificates.map((c, i) => (
//                 <Text key={i} style={styles.tag}>
//                   {c}
//                 </Text>
//               ))}
//             </View>

//             <View style={styles.finishCard}>
//               <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
//                 ¡Casi listo!
//               </Text>
//               <Text style={{ color: "#555" }}>
//                 Tu perfil será revisado por nuestro equipo. Recibirás una
//                 notificación cuando sea aprobado.
//               </Text>
//             </View>
//           </>
//         )}

//         <TouchableOpacity style={styles.mainBtn} onPress={handleNext}>
//           <Text style={styles.mainBtnText}>
//             {step === totalSteps ? "Completar registro" : "Continuar"}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F3F4F6" },

//   header: {
//     paddingTop: 60,
//     paddingBottom: 30,
//     paddingHorizontal: 20,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },

//   headerRow: { flexDirection: "row", alignItems: "center", gap: 15 },

//   backBtn: {
//     width: 40,
//     height: 40,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   headerTitle: { color: "white", fontWeight: "bold", fontSize: 18 },
//   headerSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 14 },

//   progressBg: {
//     height: 6,
//     backgroundColor: "rgba(255,255,255,0.3)",
//     borderRadius: 10,
//     marginTop: 20,
//   },

//   progressFill: {
//     height: 6,
//     backgroundColor: "white",
//     borderRadius: 10,
//   },

//   content: { padding: 20 },

//   card: {
//     backgroundColor: "#FFF",
//     borderRadius: 24,
//     padding: 20,
//     marginBottom: 20,
//   },

//   finishCard: {
//     backgroundColor: "#F5D5E1",
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 20,
//   },

//   cardTitle: { fontWeight: "bold", marginBottom: 15 },

//   label: { fontSize: 13, color: "#6B7280", marginTop: 10 },

//   row: { flexDirection: "row", gap: 10, alignItems: "center" },

//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F3F4F6",
//     borderRadius: 15,
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//     gap: 8,
//   },

//   input: { flex: 1, backgroundColor: "#F3F4F6", borderRadius: 12, padding: 12 },

//   textArea: {
//     backgroundColor: "#F3F4F6",
//     borderRadius: 15,
//     padding: 15,
//     height: 120,
//     textAlignVertical: "top",
//   },

//   uploadBox: {
//     borderWidth: 2,
//     borderStyle: "dashed",
//     borderColor: "#DDD",
//     borderRadius: 20,
//     padding: 25,
//     alignItems: "center",
//     marginTop: 15,
//   },

//   uploadText: { marginTop: 10, color: "#666" },

//   addBtn: {
//     backgroundColor: "#FF768A",
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 12,
//   },

//   addBtnText: { color: "white", fontWeight: "bold" },

//   tag: {
//     marginTop: 8,
//     backgroundColor: "#FFE4EA",
//     padding: 8,
//     borderRadius: 10,
//   },

//   mainBtn: {
//     backgroundColor: "#FF768A",
//     padding: 18,
//     borderRadius: 20,
//     alignItems: "center",
//   },

//   mainBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
// });

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function BabysitterRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [skillInput, setSkillInput] = useState("");
  const [certificateInput, setCertificateInput] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    age: "",
    email: "",
    phone: "",
    location: "",

    password: "",
    confirmPassword: "",

    presentation: "",
    experience: "",

    skills: [] as string[],
    certificates: [] as string[],

    rate: "",

    criminalRecordPhoto: null as any,
    idPhoto: null as any,
    facePhoto: null as any,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const calculateAge = (date: Date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
    return age;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);

    if (selectedDate) {
      const age = calculateAge(selectedDate);

      setFormData({
        ...formData,
        birthDate: selectedDate.toISOString().split("T")[0],
        age: age.toString(),
      });
    }
  };

  const pickImage = async (field: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        [field]: result.assets[0],
      });
    }
  };

  const takeSelfie = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Se necesita permiso para usar la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        facePhoto: result.assets[0],
      });
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});

    if (result.assets) {
      setFormData({
        ...formData,
        criminalRecordPhoto: result.assets[0],
      });
    }
  };

  const addSkill = () => {
    if (!skillInput) return;

    setFormData({
      ...formData,
      skills: [...formData.skills, skillInput],
    });

    setSkillInput("");
  };

  const addCertificate = () => {
    if (!certificateInput) return;

    setFormData({
      ...formData,
      certificates: [...formData.certificates, certificateInput],
    });

    setCertificateInput("");
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://192.168.0.17:3000/auth/register/ninera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: formData.email,
          password: "hola1234",
          nombre: formData.firstName,
          apellido: formData.lastName,
          telefono: formData.phone,
          ubicacion: formData.location,
          fecha_nacimiento: formData.birthDate || null,
          foto_url: null,
          presentacion: null,
          experiencia: null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "No se pudo completar el registro");
        return;
      }

      Alert.alert(
        "Registro exitoso",
        "La niñera fue registrada correctamente. La contraseña temporal es: hola1234",
        [
          {
            text: "OK",
            onPress: () => router.replace("/login"),
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName) {
        Alert.alert("Error", "Ingresa tu nombre completo");
        return;
      }

      if (!formData.email.includes("@")) {
        Alert.alert("Error", "Correo inválido");
        return;
      }

      if (!formData.phone || !formData.location) {
        Alert.alert("Error", "Completa teléfono y ubicación");
        return;
      }

      if (Number(formData.age) < 18) {
        Alert.alert("Error", "Debes ser mayor de edad");
        return;
      }
    }

    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    handleRegister();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.back();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#886BC1", "#FF768A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>Registro de Niñera</Text>
            <Text style={styles.headerSubtitle}>
              Paso {step} de {totalSteps}
            </Text>
          </View>
        </View>

        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              { width: `${(step / totalSteps) * 100}%` },
            ]}
          />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Información Personal</Text>

              <Text style={styles.label}>Nombres</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={18} color="#9CA3AF" />
                <TextInput
                  placeholder="Tu nombre"
                  style={styles.input}
                  onChangeText={(v) => handleInputChange("firstName", v)}
                />
              </View>

              <Text style={styles.label}>Apellidos</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={18} color="#9CA3AF" />
                <TextInput
                  placeholder="Tus apellidos"
                  style={styles.input}
                  onChangeText={(v) => handleInputChange("lastName", v)}
                />
              </View>

              <Text style={styles.label}>Fecha de nacimiento</Text>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
                <TextInput
                  placeholder="Seleccionar fecha"
                  style={styles.input}
                  value={formData.birthDate}
                  editable={false}
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <Text style={styles.label}>Edad</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={formData.age}
                  editable={false}
                />
              </View>

              <Text style={styles.label}>Correo electrónico</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
                <TextInput
                  placeholder="tu@email.com"
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={(v) => handleInputChange("email", v)}
                />
              </View>

              <Text style={styles.label}>Teléfono</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={18} color="#9CA3AF" />
                <TextInput
                  placeholder="+504 8899 8899"
                  style={styles.input}
                  onChangeText={(v) => handleInputChange("phone", v)}
                />
              </View>

              <Text style={styles.label}>Ubicación</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="location-outline" size={18} color="#9CA3AF" />
                <TextInput
                  placeholder="Ciudad, País"
                  style={styles.input}
                  onChangeText={(v) => handleInputChange("location", v)}
                />
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Verificación biométrica y documentos
              </Text>

              <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
                <Ionicons name="document-outline" size={26} color="#999" />
                <Text style={styles.uploadText}>
                  {formData.criminalRecordPhoto
                    ? formData.criminalRecordPhoto.name
                    : "Antecedentes penales"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickImage("idPhoto")}
              >
                <Ionicons name="image-outline" size={26} color="#999" />
                <Text style={styles.uploadText}>
                  {formData.idPhoto ? "Documento cargado" : "Foto de identidad"}
                </Text>

                {formData.idPhoto && (
                  <Image
                    source={{ uri: formData.idPhoto.uri }}
                    style={{ width: 80, height: 80, marginTop: 10, borderRadius: 10 }}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.uploadBox} onPress={takeSelfie}>
                <Ionicons name="camera-outline" size={26} color="#999" />
                <Text style={styles.uploadText}>
                  {formData.facePhoto ? "Selfie cargada" : "Tomar selfie"}
                </Text>

                {formData.facePhoto && (
                  <Image
                    source={{ uri: formData.facePhoto.uri }}
                    style={{ width: 80, height: 80, marginTop: 10, borderRadius: 10 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Presentación</Text>

              <TextInput
                placeholder="Cuéntanos sobre ti..."
                multiline
                style={styles.textArea}
                onChangeText={(v) => handleInputChange("presentation", v)}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Experiencia</Text>

              <TextInput
                placeholder="Describe tu experiencia profesional..."
                multiline
                style={styles.textArea}
                onChangeText={(v) => handleInputChange("experience", v)}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Habilidades</Text>

              <View style={styles.row}>
                <TextInput
                  placeholder="Ej: Primeros auxilios"
                  style={styles.input}
                  value={skillInput}
                  onChangeText={setSkillInput}
                />

                <TouchableOpacity style={styles.addBtn} onPress={addSkill}>
                  <Text style={styles.addBtnText}>Agregar</Text>
                </TouchableOpacity>
              </View>

              {formData.skills.map((skill, i) => (
                <View
                  key={i}
                  style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                >
                  <Text style={styles.tag}>{skill}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      const updated = [...formData.skills];
                      updated.splice(i, 1);
                      setFormData({ ...formData, skills: updated });
                    }}
                  >
                    <Ionicons name="close-circle" size={20} color="#FF768A" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Certificados</Text>

              <View style={styles.row}>
                <TextInput
                  placeholder="Ej: Certificado en RCP"
                  style={styles.input}
                  value={certificateInput}
                  onChangeText={setCertificateInput}
                />

                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={addCertificate}
                >
                  <Text style={styles.addBtnText}>Agregar</Text>
                </TouchableOpacity>
              </View>

              {formData.certificates.map((c, i) => (
                <View
                  key={i}
                  style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                >
                  <Text style={styles.tag}>{c}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      const updated = [...formData.certificates];
                      updated.splice(i, 1);
                      setFormData({ ...formData, certificates: updated });
                    }}
                  >
                    <Ionicons name="close-circle" size={20} color="#FF768A" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Tarifa por hora</Text>

              <TextInput
                placeholder="Ej: 200 LPS"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(v) => handleInputChange("rate", v)}
              />
            </View>

            <View style={styles.finishCard}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                ¡Casi listo!
              </Text>
              <Text style={{ color: "#555" }}>
                Tu perfil será revisado por nuestro equipo. Recibirás una
                notificación cuando sea aprobado.
              </Text>
            </View>
          </>
        )}

        <TouchableOpacity
          style={[styles.mainBtn, loading && { opacity: 0.7 }]}
          onPress={handleNext}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.mainBtnText}>
              {step === totalSteps ? "Completar registro" : "Continuar"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },

  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerRow: { flexDirection: "row", alignItems: "center", gap: 15 },

  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: { color: "white", fontWeight: "bold", fontSize: 18 },
  headerSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 14 },

  progressBg: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    marginTop: 20,
  },

  progressFill: {
    height: 6,
    backgroundColor: "white",
    borderRadius: 10,
  },

  content: { padding: 20 },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },

  finishCard: {
    backgroundColor: "#F5D5E1",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: { fontWeight: "bold", marginBottom: 15 },

  label: { fontSize: 13, color: "#6B7280", marginTop: 10 },

  row: { flexDirection: "row", gap: 10, alignItems: "center" },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 8,
  },

  input: { flex: 1, backgroundColor: "#F3F4F6", borderRadius: 12, padding: 12 },

  textArea: {
    backgroundColor: "#F3F4F6",
    borderRadius: 15,
    padding: 15,
    height: 120,
    textAlignVertical: "top",
  },

  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#DDD",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginTop: 15,
  },

  uploadText: { marginTop: 10, color: "#666" },

  addBtn: {
    backgroundColor: "#FF768A",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },

  addBtnText: { color: "white", fontWeight: "bold" },

  tag: {
    marginTop: 8,
    backgroundColor: "#FFE4EA",
    padding: 8,
    borderRadius: 10,
  },

  mainBtn: {
    backgroundColor: "#FF768A",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  mainBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});