import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FIcon from "../../assets/FIcon.png";
import SIcon from "../../assets/SIcon.png";
import TIcon from "../../assets/TIcon.png";
import { useRef } from "react";
import FthIcon from "../../assets/FthIcon.png";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataForCategory from "./dataForCategory";
import { Country, State, City } from "country-state-city";
import emailjs from "emailjs-com";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";

function Category() {
  // const states = csc.getStatesOfCountry(country.isoCode);
  // states.forEach((state) => {
  //   const cities_of_state = csc.getCitiesOfState(countryCode, state.isoCode);
  //   console.log(state, ":", cities_of_state);
  // });
  // const countryObj = countries.getNames("en", { select: "official" });
  // const cityArr= City.getCitiesOfState(State.isoCode).map((city) => ({ label: city.name, value: city.id, ...city }));
  // const countryArr = Object.entries(countryObj).map(([key, value]) => {
  //   return {
  //     label: city.name,
  //     value: key,
  //   };
  // });

  // const country = Country.getCountryByCode(countryCode);

  const { id } = useParams();
  const type = id.split("-").join(" ");
  const [algorithm, setAlgorithm] = React.useState("");
  const [isActive, setIsActive] = useState(false);

  const [businessActive, setBusinessActive] = useState(false);
  const [educationActive, setEducationActive] = useState(false);
  const [realEstateActive, setRealEstateActive] = useState(false);
  const [personalActive, setPersonalActive] = useState(false);

  useEffect(() => {
    if (id === "personal") {
      setPersonalActive(true);
    } else if (id === "business") {
      setBusinessActive(true);
    } else if (id === "education") {
      setEducationActive(true);
    } else if (id === "real-estate") {
      setRealEstateActive(true);
    }
  }, [id]);

  const form = useRef();
  const data = dataForCategory;
  const countryCode = "US";
  const stateArr = State.getStatesOfCountry(countryCode).map((state) => ({
    label: state.name,
    value: state.id,
    ...state,
  }));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [income, setIncome] = useState("");
  const [occupation, setOccupation] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDisability, setSelectedDisability] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [citizenshipStatus, setCitizenshipStatus] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const selectedStateHandler = (value) => {
    setSelectedState(value);
  };

  let formData = {
    first_name: "",
    last_name: "",
    home_address: "",
    zip_code: "",
    phone_number: "",
    state: "",
    city: "",
    monthly_income: "",
    date_of_birth: "",
    marital_status: "",
    email: "",
    age: "",
    gender: "",
    disability: "",
    occupation: "",
    category: "",
    ethnicity: "",
    citizenshipStatus: "",
  };

  useEffect(() => {
    setAlgorithm(id);
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      firstName &&
      lastName &&
      homeAddress &&
      zipCode &&
      email &&
      phone &&
      date &&
      income &&
      occupation &&
      selectedState &&
      selectedCity &&
      selectedDisability &&
      selectedAge &&
      selectedGender &&
      ethnicity &&
      citizenshipStatus &&
      selectedStatus
    ) {
      formData = {
        ...formData,
        first_name: firstName,
        last_name: lastName,
        home_address: homeAddress,
        zip_code: zipCode,
        age: selectedAge,
        gender: selectedGender,
        phone_number: phone,
        state: selectedState,
        city: selectedCity,
        monthly_income: income,
        date_of_birth: date,
        marital_status: selectedStatus,
        email: email,
        disability: selectedDisability,
        occupation: occupation,
        ethnicity: ethnicity,
        citizenshipStatus: citizenshipStatus,
        category: id,
      };

      emailjs
        .sendForm(
          "service_p102o41",
          "template_63aks7n",
          form.current,
          "Zi06-R-MsyzuIaHca"
        )
        .then(
          (result) => {
            console.log(result.text);
            toast.success("Form Submitted Successfully");
          },
          (error) => {
            console.log(error.text);
          }
        );

      setFirstName(" ");
      setLastName(" ");
      setZipCode(" ");
      setHomeAddress(" ");
      setSelectedState(" ");
      setSelectedCity(" ");
      setSelectedAge(" ");
      setSelectedGender(" ");
      setPhone(" ");
      setDate(" ");
      setEmail(" ");
      setOccupation(" ");
      setIncome(" ");
      setEthnicity(" ");
      setCitizenshipStatus(" ");
      setSelectedStatus(" ");
      setSelectedDisability("??");

      e.target.reset();
      console.log(formData);
    } else {
      toast.error("Please Fill All Fields");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center m-auto  ">
        <div className="flex flex-col items-center justify-center w-full m-auto  ">
          <div className=" bg-[#F4F0F8] h-[348px] w-full ">
            <div className="flex flex-col lg:p-14 md:p-14 p-14  gap-4  items-center ">
              <h1 className="font-bold text-[30px] text-center font-sen lg:text-[48px] md:text-[40px] lg:leading-[64px] md:leading-[48px] leading-[40px] tracking-[-2px] text-[#232536] capitalize  ">
                {type} Lottery
              </h1>
              {type === "personal" && (
                <p className="text-[#6D6E76] font-inter lg:w-[515px] text-center font-normal text-[12px] lg:text-[16px] md:text-[16px]  leading-[28px]  ">
                  {data.personal}
                </p>
              )}
              {type === "business" && (
                <p className="text-[#6D6E76] font-inter lg:w-[515px] text-center font-normal text-[12px] lg:text-[16px] md:text-[16px]  leading-[28px]  ">
                  {data.business}
                </p>
              )}{" "}
              {type === "education" && (
                <p className="text-[#6D6E76] font-inter lg:w-[515px] text-center font-normal text-[12px] lg:text-[16px] md:text-[16px]  leading-[28px]  ">
                  {data.education}
                </p>
              )}{" "}
              {type === "real estate" && (
                <p className="text-[#6D6E76] font-inter lg:w-[515px] text-center font-normal text-[12px] lg:text-[16px] md:text-[16px]  leading-[28px]  ">
                  {data.housing}
                </p>
              )}
              <p className="text-[#232536] font-inter lg:w-[515px] uppercase text-center font-normal text-[12px] lg:text-[16px] md:text-[16px]  leading-[28px]  ">
                Apply {">"} {type} Lottery
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-  flex-col-reverse lg:p-10 md:p-10 p-2  mt-8 mb-14 lg:flex-row items-center  lg:items-start gap-8 m-auto justify-center">
          <div className=" flex flex-col gap-8 flex-2 ">
            <h2 className=" lg:text-[36px] font-sen text-[24px] pt-6 lg:w-[500px] lg:leading-[48px]  leading-[30px] md:text-[30px] md:leading-[30px] font-bold  text-[#232536]  tracking-[-2px] ">
              Fill the form below to enter for a{" "}
              <span className="capitalize">{type}</span> Lottery
            </h2>
            <form
              className="lg:w-[500px] pb-6 lg:pl-6 pl-0 pr-0 "
              onSubmit={handleFormSubmit}
              ref={form}
            >
              <div className="form-group mb-4">
                <input
                  required
                  type="text"
                  className="form-control
        block
        w-full
        px-3
        py-4
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                />
              </div>

              <div className="form-group mb-4">
                <input
                  required
                  type="text"
                  className="form-control
        block
        w-full
        px-3
        py-4
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                />
              </div>

              <div className="form-group mb-4">
                <input
                  required
                  type="text"
                  className="form-control
        block
        w-full
        px-3
        py-4
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Street Address"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  name="homeAddress"
                />
              </div>

              <div className="form-group mb-4">
                <input
                  required
                  type="number"
                  className="form-control
        block
        w-full
        px-3
        py-4
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInputEmail2"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  name="zipCode"
                />
              </div>

              <div className="form-group mb-4 flex flex-col lg:flex-row gap-4 w-full ">
                <input
                  required
                  type="text"
                  className="form-control
        block
        w-full
        px-3
        py-4
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="City"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  name="city"
                />

                <FormControl sx={{ width: "100%" }}>
                  <InputLabel className="  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none   text-gray-700 ">
                    Select State
                  </InputLabel>
                  <Select
                    required
                    className=" 
                       w-full
                       font-normal
                       transition
                       ease-in-out
                       text-gray-700
                       bg-white bg-clip-padding
                       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                       rounded
                       m-0
                     "
                    value={selectedState}
                    name="state"
                    onChange={(e) => {
                      selectedStateHandler(e.target.value);
                    }}
                    label="Select State"
                  >
                    {stateArr?.length &&
                      stateArr.map(({ label, value }) => (
                        <MenuItem key={value} value={label}>
                          {label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>

              <div className="form-group mb-4 flex flex-col lg:flex-row gap-4 w-full ">
                <input
                  required
                  type="number"
                  className="form-control
                  block
                  w-full
                  px-3
                  py-4
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInputEmail2"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  name="phoneNumber"
                />
                <input
                  type="date"
                  required
                  className="form-control
        block
        w-full
        px-3
        py-4
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Select a date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  name="date"
                />
              </div>

              <div className="form-group mb-4 flex flex-col lg:flex-row gap-4 w-full ">
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel className="  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none   text-gray-700 ">
                    Gender
                  </InputLabel>
                  <Select
                    required
                    className=" 
                       w-full
                       font-normal
                       transition
                       ease-in-out
                       text-gray-700
                       bg-white bg-clip-padding
                       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                       rounded
                    
                       m-0
                     "
                    value={selectedGender}
                    onChange={(e) => {
                      setSelectedGender(e.target.value);
                    }}
                    label="Gender"
                    name="gender"
                  >
                    <MenuItem value={"male"}>
                      <em>Male</em>
                    </MenuItem>
                    <MenuItem value={"female"}>
                      <em>Female</em>
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel className="  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none   text-gray-700 ">
                    What is your age?
                  </InputLabel>
                  <Select
                    required
                    className=" 
                       w-full
                       font-normal
                       transition
                       ease-in-out
                       text-gray-700
                       bg-white bg-clip-padding
                       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                       rounded
                    
                       m-0
                     "
                    value={selectedAge}
                    onChange={(e) => {
                      setSelectedAge(e.target.value);
                    }}
                    label="What is your age?"
                    name="age"
                  >
                    <MenuItem value={"18-25"}>
                      <em>18-25</em>
                    </MenuItem>
                    <MenuItem value={"26-34"}>
                      <em>26-34</em>
                    </MenuItem>
                    <MenuItem value={"35-49"}>
                      <em>35-49</em>
                    </MenuItem>
                    <MenuItem value={"50-65"}>
                      <em>50-65</em>
                    </MenuItem>
                    <MenuItem value={"65-80"}>
                      <em>65-80</em>
                    </MenuItem>
                    <MenuItem value={"80+"}>
                      <em>80 +</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="form-group mb-4 flex flex-col lg:flex-row gap-4 w-full ">
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel className="  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none   text-gray-700 ">
                    Citizenship Status
                  </InputLabel>
                  <Select
                    required
                    className=" 
                       w-full
                       font-normal
                       transition
                       ease-in-out
                       text-gray-700
                       bg-white bg-clip-padding
                       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                       rounded
                    
                       m-0
                     "
                    value={citizenshipStatus}
                    onChange={(e) => {
                      setCitizenshipStatus(e.target.value);
                    }}
                    label="Citizenship Status"
                    name="citizenshipStatus"
                  >
                    <MenuItem value={"U.S. Resident"}>
                      <em>U.S. Resident</em>
                    </MenuItem>
                    <MenuItem value={"Resident Alien"}>
                      <em>Resident Alien</em>
                    </MenuItem>
                    <MenuItem value={"Green Card Holder"}>
                      <em>Green Card Holder</em>
                    </MenuItem>
                    <MenuItem value={"Permanent Resident"}>
                      <em>Permanent Resident</em>
                    </MenuItem>
                    <MenuItem value={"Not sure"}>
                      <em>Not Sure</em>
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel className="  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none   text-gray-700 ">
                    Ethnicity
                  </InputLabel>
                  <Select
                    required
                    className=" 
                       w-full
                       font-normal
                       transition
                       ease-in-out
                       text-gray-700
                       bg-white bg-clip-padding
                       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                       rounded
                    
                       m-0
                     "
                    value={ethnicity}
                    onChange={(e) => {
                      setEthnicity(e.target.value);
                    }}
                    label="Ethnicity"
                    name="ethnicity"
                  >
                    <MenuItem value={"Asian American"}>
                      <em>Asian American</em>
                    </MenuItem>
                    <MenuItem value={"Black Or African American"}>
                      <em>Black Or African American</em>
                    </MenuItem>
                    <MenuItem value={"Hispanic"}>
                      <em>Hispanic</em>
                    </MenuItem>
                    <MenuItem value={"Latino"}>
                      <em>Latino</em>
                    </MenuItem>
                    <MenuItem value={"Middle Eastern American"}>
                      <em>Middle Eastern American</em>
                    </MenuItem>
                    <MenuItem value={"Multi-racial"}>
                      <em>Multi-racial</em>
                    </MenuItem>
                    <MenuItem value={"Native American"}>
                      <em>Native American</em>
                    </MenuItem>
                    <MenuItem value={"Native Hawaiian"}>
                      <em>Native Hawaiian</em>
                    </MenuItem>
                    <MenuItem value={"Other"}>
                      <em>Other</em>
                    </MenuItem>
                    <MenuItem value={"Pacific Islander"}>
                      <em>Pacific Islander</em>
                    </MenuItem>
                    <MenuItem value={"White"}>
                      <em>White</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="form-group mb-4 flex flex-col lg:flex-row gap-4 w-full ">
                <input
                  required
                  type="email"
                  className="form-control
                  block
                  w-full
                  px-3
                  py-4
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
                <input
                  type="text"
                  required
                  className="form-control
        block
        w-full
        px-3
        py-4
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Occupation"
                  value={occupation}
                  onChange={(e) => {
                    setOccupation(e.target.value);
                  }}
                  name="occupation"
                />
              </div>

              <div className="form-group mb-4 flex flex-col lg:flex-row gap-4 w-full ">
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel className="  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none   text-gray-700 ">
                    Monthly Income
                  </InputLabel>
                  <Select
                    required
                    className=" 
                       w-full
                       font-normal
                       transition
                       ease-in-out
                       text-gray-700
                       bg-white bg-clip-padding
                       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                       rounded
                       m-0
                     "
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    name="monthlyIncome"
                    label="Monthly Income"
                  >
                    <MenuItem value={"$100 - $1,000"}>
                      <em>$100 - $1,000</em>
                    </MenuItem>
                    <MenuItem value={"$1,000 - $5,000"}>
                      <em>$1,000 - $5,000</em>
                    </MenuItem>
                    <MenuItem value={"$5,000 - $20,000"}>
                      <em>$5,000 - $20,000</em>
                    </MenuItem>
                    <MenuItem value={"$20,000 - $50,000"}>
                      <em>$20,000 - $50,000</em>
                    </MenuItem>
                    <MenuItem value={"$100,000 or More???"}>
                      <em>$100,000 or More???</em>
                    </MenuItem>
                  </Select>
                </FormControl>

                <div
                  className="flex flex-col gap-2 
                 w-full
                  px-3
                  "
                >
                  <label htmlFor="occupation">Marital Status</label>
                  <div className="flex flex-col">
                    {" "}
                    <div className="flex flex-row justify-between w-[200px] ">
                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="w-6 h-6 rounded-full"
                            value={selectedStatus}
                            checked={selectedStatus === "single"}
                            onChange={() => {
                              setSelectedStatus("single");
                            }}
                            name="maritalStatus"
                          />
                          <span className="ml-2">Single</span>
                        </label>
                      </div>

                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="w-6 h-6 rounded-full"
                            value={selectedStatus}
                            checked={selectedStatus === "married"}
                            onChange={() => {
                              setSelectedStatus("married");
                            }}
                            name="maritalStatus"
                          />
                          <span className="ml-2">Married</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between w-[212px]">
                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="w-6 h-6 rounded-full"
                            value={selectedStatus}
                            checked={selectedStatus === "divorced"}
                            onChange={() => {
                              setSelectedStatus("divorced");
                            }}
                            name="maritalStatus"
                          />
                          <span class="ml-2">Divorced</span>
                        </label>
                      </div>

                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="w-6 h-6 rounded-full"
                            value={selectedStatus}
                            checked={selectedStatus === "widowed"}
                            onChange={() => {
                              setSelectedStatus("widowed");
                            }}
                            name="maritalStatus"
                          />
                          <span className="ml-2">Widowed</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group mb-4">
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel className="  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none   text-gray-700 ">
                    Disability
                  </InputLabel>
                  <Select
                    required
                    className=" 
                       w-full
                       font-normal
                       transition
                       ease-in-out
                       text-gray-700
                       bg-white bg-clip-padding
                       focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                       rounded
                    
                       m-0
                     "
                    value={selectedDisability}
                    onChange={(e) => {
                      setSelectedDisability(e.target.value);
                    }}
                    label="Disability"
                    name="disability"
                  >
                    <MenuItem value={"none"}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"deaf"}>
                      <em>Deaf</em>
                    </MenuItem>
                    <MenuItem value={"others"}>
                      <em>Others</em>
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <button
                type="submit"
                className="
                font-inter
      w-full
      px-6
      py-4
      bg-[#50C0FF]
      text-[#232536]
      lg:text-[24px]
      text-[18px]
      leading-[32px]
      capitalize
      font-normal
      rounded
      shadow-md
      hover:bg-blue-400 hover:shadow-lg
      focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-300 active:shadow-lg
      transition
      duration-150
      ease-in-out"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-6 lg:gap-8  mt-6 ">
            <h2 className=" lg:text-[36px] text-[24px] font-sen text-center lg:text-start lg:leading-[48px]  leading-[30px] md:text-[30px] md:leading-[30px] font-bold  text-[#232536] tracking-[-2px] ">
              Categories
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-row lg:flex-col gap-4">
                <div className="ttt flex flex-row w-full justify-between gap-2  ">
                  <a
                    href="/category/business"
                    className={` lg:items-start w-[130px] py-[14px] px-[6px] lg:px-[20px] md:px-[20px] md:w-[310px] lg:w-full  border border-solid ${
                      algorithm === "business" && "bg-[#50C0FF]"
                    } rounded-lg hover:bg-[#50C0FF] hover:transition hover:duration-300 hover:ease-in-out hover:border-none cursor-pointer border-[#6D6E76]rounded-sm  `}
                  >
                    <div className="flex flex-col gap-2 mt-2 ">
                      <div className="flex">
                        <div className="text-white font-bold">
                          <div className=" flex lg:flex-row  md:flex-row flex-col gap-3 justify-between lg:gap-6 md:gap-6  ">
                            <div
                              className={`w-[48px] h-[48px] ${
                                isActive ? "bg-transparent" : "bg-[#FBF6EA]"
                              }  flex rounded `}
                            >
                              <img
                                src={FIcon}
                                alt="FIcon"
                                className="w-[48px] h-[48px] align-middle m-auto flex  "
                              />
                            </div>
                            <h2 className="text-[#232536] font-sen font-bold lg:text-[28px]  text-[15px] leading:[20px] md:text-[22px] lg:leading-[40px] md:leading:[35px]  tracking-[-1px] ">
                              Business Lottery
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    {businessActive && (
                      <div className="shadow-3xl hidden lg:block  rounded-2xl shadow-cyan-500/50 p-4 mb-6">
                        <ul className="flex flex-col list-disc font-inter pl-4 gap-2">
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Small Business Funding / Management
                          </li>
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            <li className="text-[14px] font-normal leading-[28px]  ">
                              Start-up / Expansion Business Capital
                            </li>
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Home Business Assistance
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Women-Owned Business Funding
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Small Business Loans
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Minority-Owned Business Funding
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Private Money / Venture Capital
                          </li>
                        </ul>
                      </div>
                    )}
                  </a>
                </div>

                <div className="ttt flex flex-row w-full justify-between gap-2  ">
                  <a
                    href="/category/education"
                    className={` lg:items-start w-[130px] py-[14px] px-[6px] lg:px-[20px] md:px-[20px] md:w-[310px] lg:w-full border border-solid ${
                      algorithm === "education" && "bg-[#50C0FF]"
                    } rounded-lg hover:bg-[#50C0FF] hover:transition hover:duration-300 hover:ease-in-out hover:border-none cursor-pointer border-[#6D6E76]rounded-sm  `}
                  >
                    <div className="flex flex-col gap-2 mt-2 ">
                      <div className="flex">
                        <div className="text-white font-bold">
                          <div className=" flex lg:flex-row  md:flex-row flex-col gap-3 justify-between lg:gap-6 md:gap-6  ">
                            <div
                              className={`w-[48px] h-[48px] ${
                                isActive ? "bg-transparent" : "bg-[#FBF6EA]"
                              }  flex rounded `}
                            >
                              <img
                                src={SIcon}
                                alt="SIcon"
                                className="w-[23px] h-[23px] align-middle m-auto flex  "
                              />
                            </div>
                            <h2 className="text-[#232536] font-sen font-bold lg:text-[28px]  text-[15px] leading:[20px] md:text-[22px] lg:leading-[40px] md:leading:[35px]  tracking-[-1px] ">
                              Education Lottery
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    {educationActive && (
                      <div className="shadow-3xl hidden lg:block  rounded-2xl shadow-cyan-500/50 p-4 mb-6">
                        <ul className="flex font-inter flex-col list-disc pl-4 gap-2">
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Federal Pell Lottery
                          </li>
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            <li className="text-[14px] font-normal leading-[28px]  ">
                              Scholarships
                            </li>
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Student Financial Aid
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Training Lottery
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Tuition Assistance
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Lottery For Research
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Stafford Loans
                          </li>
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Lottery for Universities
                          </li>
                        </ul>
                      </div>
                    )}
                  </a>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col gap-4">
                <div className="ttt flex flex-row w-full justify-between gap-2  ">
                  <a
                    href="/category/real-estate"
                    className={` lg:items-start w-[130px] py-[14px] px-[6px] lg:px-[20px] md:px-[20px] md:w-[310px] lg:w-full border border-solid ${
                      algorithm === "real-estate" && "bg-[#50C0FF]"
                    } rounded-lg hover:bg-[#50C0FF] hover:transition hover:duration-300 hover:ease-in-out hover:border-none cursor-pointer border-[#6D6E76]rounded-sm  `}
                  >
                    <div className="flex flex-col gap-2 mt-2 ">
                      <div className="flex">
                        <div className="text-white font-bold">
                          <div className=" flex lg:flex-row  md:flex-row flex-col gap-3 justify-between lg:gap-6 md:gap-6  ">
                            <div
                              className={`w-[48px] h-[48px] ${
                                isActive ? "bg-transparent" : "bg-[#FBF6EA]"
                              }  flex rounded `}
                            >
                              <img
                                src={SIcon}
                                alt="SIcon"
                                className="w-[23px] h-[23px] align-middle m-auto flex  "
                              />
                            </div>
                            <h2 className="text-[#232536] font-sen font-bold lg:text-[28px]   text-[15px] leading:[20px] md:text-[22px] lg:leading-[40px] md:leading:[35px]  tracking-[-1px] ">
                              Real Estate Lottery
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    {realEstateActive && (
                      <div className="shadow-3xl hidden lg:block  rounded-2xl shadow-cyan-500/50 p-4 mb-6">
                        <ul className="flex font-inter flex-col list-disc pl-4 gap-2">
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            1st Time Home Buyer
                          </li>
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            <li className="text-[14px] font-normal leading-[28px]  ">
                              Mobile Homes / Parks
                            </li>
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Rental Housing Projects
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Commerical Property
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Apartment Buildings
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Land Development
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            RV Parks
                          </li>
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            New Construction
                          </li>
                        </ul>
                      </div>
                    )}
                  </a>
                </div>

                <div className="ttt flex flex-row w-full justify-between gap-2  ">
                  <a
                    href="/category/personal"
                    className={` lg:items-start w-[130px] py-[14px] px-[6px] lg:px-[20px] md:px-[20px] md:w-[310px] lg:w-full border border-solid ${
                      algorithm === "personal" && "bg-[#50C0FF]"
                    } rounded-lg hover:bg-[#50C0FF] hover:transition hover:duration-300 hover:ease-in-out hover:border-none cursor-pointer border-[#6D6E76]rounded-sm  `}
                  >
                    <div className="flex flex-col gap-2 mt-2 ">
                      <div className="flex">
                        <div className="text-white font-bold">
                          <div className=" flex lg:flex-row  md:flex-row flex-col gap-3 justify-between lg:gap-6 md:gap-6  ">
                            <div
                              className={`w-[48px] h-[48px] ${
                                isActive ? "bg-transparent" : "bg-[#FBF6EA]"
                              }  flex rounded `}
                            >
                              <img
                                src={SIcon}
                                alt="SIcon"
                                className="w-[23px] h-[23px] align-middle m-auto flex  "
                              />
                            </div>
                            <h2 className="text-[#232536] font-sen font-bold lg:text-[28px]   text-[15px] leading:[20px] md:text-[22px] lg:leading-[40px] md:leading:[35px]  tracking-[-1px] ">
                              Personal Lottery
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    {personalActive && (
                      <div className=" hidden lg:block shadow-3xl rounded-2xl shadow-cyan-500/50 p-4 mb-6">
                        <ul className="flex font-inter flex-col list-disc pl-4 gap-2">
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Home Repair
                          </li>
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            <li className="text-[14px] font-normal leading-[28px]  ">
                              Rent Assistance
                            </li>
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Child Care
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Food and Nutrition
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Medical Bills Assistance
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Utility Bills Assistance
                          </li>{" "}
                          <li className="text-[14px] font-normal leading-[28px]  ">
                            Education Assistance
                          </li>
                        </ul>
                      </div>
                    )}
                  </a>
                </div>
              </div>
            </div>

            <div className=" p-6 shadow-lg lg:shadow-none bg-gray-200 lg:bg-transparent font-inter text-start md:m-auto md:text-center">
              <div className="block lg:hidden">
                {businessActive && (
                  <div className="shadow-3xl   rounded-2xl shadow-cyan-500/50 p-4 mb-6">
                    <ul className="flex flex-col list-disc pl-4 gap-2">
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Small Business Funding / Management
                      </li>
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        <li className="text-[14px] font-normal leading-[28px]  ">
                          Start-up / Expansion Business Capital
                        </li>
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Home Business Assistance
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Women-Owned Business Funding
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Small Business Loans
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Minority-Owned Business Funding
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Private Money / Venture Capital
                      </li>
                    </ul>
                  </div>
                )}
                {educationActive && (
                  <div className="shadow-3xl rounded-2xl shadow-cyan-500/50 p-4 mb-6">
                    <ul className="flex flex-col list-disc pl-4 gap-2">
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Federal Pell Lottery
                      </li>
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        <li className="text-[14px] font-normal leading-[28px]  ">
                          Scholarships
                        </li>
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Student Financial Aid
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Training Lottery
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Tuition Assistance
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Lottery For Research
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Stafford Loans
                      </li>
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Lottery for Universities
                      </li>
                    </ul>
                  </div>
                )}
                {realEstateActive && (
                  <div className="shadow-3xl  rounded-2xl shadow-cyan-500/50 p-4 mb-6">
                    <ul className="flex flex-col list-disc pl-4 gap-2">
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        1st Time Home Buyer
                      </li>
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        <li className="text-[14px] font-normal leading-[28px]  ">
                          Mobile Homes / Parks
                        </li>
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Rental Housing Projects
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Commerical Property
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Apartment Buildings
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Land Development
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        RV Parks
                      </li>
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        New Construction
                      </li>
                    </ul>
                  </div>
                )}
                {personalActive && (
                  <div className="  shadow-3xl rounded-2xl shadow-cyan-500/50 p-4 mb-6">
                    <ul className="flex flex-col list-disc pl-4 gap-2">
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Home Repair
                      </li>
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        <li className="text-[14px] font-normal leading-[28px]  ">
                          Rent Assistance
                        </li>
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Child Care
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Food and Nutrition
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Medical Bills Assistance
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Utility Bills Assistance
                      </li>{" "}
                      <li className="text-[14px] font-normal leading-[28px]  ">
                        Education Assistance
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Category;
