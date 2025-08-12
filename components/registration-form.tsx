"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { submitRegistration } from "@/lib/actions";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  affiliation: z.string().min(1, {
    message: "Affiliation is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  position: z.enum(
    [
      "bachelor_student",
      "master_student",
      "phd_student",
      "researcher",
      "professor",
      "industry",
      "other",
    ],
    {
      required_error: "Please select your position.",
    },
  ),
  positionOther: z.string().optional(),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }),
  attendanceReason: z.enum(
    ["present_research", "attend_sessions", "networking", "other"],
    {
      required_error: "Please select your main reason for attending.",
    },
  ),
  attendanceReasonOther: z.string().optional(),
  presenting: z.enum(["oral", "poster", "no"]).optional(),
  mapChallenge: z.boolean(),
  attendingDinner: z.boolean(),
  dietaryRestrictions: z.enum(
    ["none", "vegetarian", "vegan", "gluten_free", "halal", "other"],
    {
      required_error: "Please select your dietary restrictions.",
    },
  ),
  dietaryRestrictionsOther: z.string().optional(),
  alcoholConsumption: z.enum(["yes", "no", "maybe"], {
    required_error: "Please indicate your alcohol consumption preference.",
  }),
  drinkPreferences: z.array(z.string()).min(1, {
    message: "Please select at least one drink preference.",
  }),
  drinkRestrictions: z.string().optional(),
  workshopPreferences: z.object({
    disasterManagement: z.number().min(1).max(3),
    digitalTwins: z.number().min(1).max(3),
    participatoryMapping: z.number().min(1).max(3),
  }),
  needsAccommodationHelp: z.boolean(),
  joinWhatsApp: z.boolean(),
  consentPublicList: z.boolean(),
  consentPhotography: z.boolean(),
  howDidYouHear: z
    .enum([
      "university",
      "social_media",
      "friend_colleague",
      "website",
      "other",
    ])
    .optional(),
  howDidYouHearOther: z.string().optional(),
  additionalComments: z.string().optional(),
});

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Brazil",
  "Bulgaria",
  "Cambodia",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Czech Republic",
  "Denmark",
  "Ecuador",
  "Egypt",
  "Estonia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Pakistan",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Venezuela",
  "Vietnam",
];

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      affiliation: "",
      country: "",
      positionOther: "",
      website: "",
      attendanceReasonOther: "",
      presenting: "no",
      mapChallenge: false,
      attendingDinner: false,
      dietaryRestrictionsOther: "",
      drinkPreferences: [],
      drinkRestrictions: "",
      workshopPreferences: {
        disasterManagement: 1,
        digitalTwins: 2,
        participatoryMapping: 3,
      },
      needsAccommodationHelp: false,
      joinWhatsApp: false,
      consentPublicList: false,
      consentPhotography: false,
      howDidYouHearOther: "",
      additionalComments: "",
    },
  });

  const watchPosition = form.watch("position");
  const watchAttendanceReason = form.watch("attendanceReason");
  const watchDietaryRestrictions = form.watch("dietaryRestrictions");
  const watchHowDidYouHear = form.watch("howDidYouHear");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // Validate workshop preferences are unique
      const preferences = [
        values.workshopPreferences.disasterManagement,
        values.workshopPreferences.digitalTwins,
        values.workshopPreferences.participatoryMapping,
      ];
      const uniquePreferences = new Set(preferences);
      if (uniquePreferences.size !== 3) {
        toast({
          title: "Invalid workshop preferences",
          description: "Please assign unique ranks (1, 2, 3) to each workshop.",
          variant: "destructive",
        });
        return;
      }

      await submitRegistration(values);

      toast({
        title: "Registration successful!",
        description: "Thank you for registering for GeoMundus 2025!",
      });

      // Reset form
      form.reset();

      // Redirect to confirmation page
      router.push("/registration/confirmation");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description:
          "There was a problem with your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            GeoMundus 2025 – Registration Form
          </CardTitle>
          <CardDescription className="text-lg">
            Be part of GeoMundus 2025, an international conference focused on
            Geospatial Technologies for Smart Cities.
          </CardDescription>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Event Dates:</strong> October 17–18, 2025
            </p>
            <p>
              <strong>Location:</strong> Lisbon, Portugal
            </p>
            <p>
              <strong>Contact:</strong> program@geomundus.org
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="affiliation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Affiliation (University / Organization) *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="University of Lisbon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country of Residence *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position / Role *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="bachelor_student"
                              id="bachelor_student"
                            />
                            <Label htmlFor="bachelor_student">
                              Bachelor Student
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="master_student"
                              id="master_student"
                            />
                            <Label htmlFor="master_student">
                              Master Student
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="phd_student"
                              id="phd_student"
                            />
                            <Label htmlFor="phd_student">PhD Student</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="researcher"
                              id="researcher"
                            />
                            <Label htmlFor="researcher">Researcher</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="professor" id="professor" />
                            <Label htmlFor="professor">
                              Professor / Lecturer
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="industry" id="industry" />
                            <Label htmlFor="industry">
                              Industry Professional
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchPosition === "other" && (
                  <FormField
                    control={form.control}
                    name="positionOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify your position</FormLabel>
                        <FormControl>
                          <Input placeholder="Your position" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional website or LinkedIn *</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://linkedin.com/in/johndoe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Participation Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Participation Details</h3>

                <FormField
                  control={form.control}
                  name="attendanceReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What is your main reason for attending GeoMundus 2025? *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="present_research"
                              id="present_research"
                            />
                            <Label htmlFor="present_research">
                              To present research
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="attend_sessions"
                              id="attend_sessions"
                            />
                            <Label htmlFor="attend_sessions">
                              To attend sessions
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="networking"
                              id="networking"
                            />
                            <Label htmlFor="networking">Networking</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="reason_other" />
                            <Label htmlFor="reason_other">Other</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchAttendanceReason === "other" && (
                  <FormField
                    control={form.control}
                    name="attendanceReasonOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify your reason</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your reason for attending"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="presenting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Will you be presenting at the conference?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="oral" id="oral" />
                            <Label htmlFor="oral">
                              Yes – Oral presentation
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="poster" id="poster" />
                            <Label htmlFor="poster">
                              Yes – Poster presentation
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no_presentation" />
                            <Label htmlFor="no_presentation">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mapChallenge"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Would you like to submit an entry for the Map+
                          Challenge?
                        </FormLabel>
                        <FormDescription>
                          <a href="#" className="text-blue-600 hover:underline">
                            See guidelines of participation here
                          </a>
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Conference Dinner & Drinks */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">
                  Conference Dinner & Drinks
                </h3>

                <FormField
                  control={form.control}
                  name="attendingDinner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Will you attend the conference dinner (Friday 17th)? *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(value === "yes")
                          }
                          defaultValue={field.value ? "yes" : "no"}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="dinner_yes" />
                            <Label htmlFor="dinner_yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="dinner_no" />
                            <Label htmlFor="dinner_no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dietaryRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Do you have any dietary restrictions? *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="diet_none" />
                            <Label htmlFor="diet_none">None</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="vegetarian"
                              id="vegetarian"
                            />
                            <Label htmlFor="vegetarian">Vegetarian</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="vegan" id="vegan" />
                            <Label htmlFor="vegan">Vegan</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="gluten_free"
                              id="gluten_free"
                            />
                            <Label htmlFor="gluten_free">Gluten-Free</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="halal" id="halal" />
                            <Label htmlFor="halal">Halal</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="diet_other" />
                            <Label htmlFor="diet_other">Other</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchDietaryRestrictions === "other" && (
                  <FormField
                    control={form.control}
                    name="dietaryRestrictionsOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Please specify your dietary restrictions
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your dietary restrictions"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="alcoholConsumption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Do you plan to consume alcoholic beverages at dinner? *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="alcohol_yes" />
                            <Label htmlFor="alcohol_yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="alcohol_no" />
                            <Label htmlFor="alcohol_no">No</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="maybe" id="alcohol_maybe" />
                            <Label htmlFor="alcohol_maybe">Maybe</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="drinkPreferences"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          What types of drinks do you prefer? (Select all that
                          apply) *
                        </FormLabel>
                      </div>
                      {[
                        { id: "water", label: "Water" },
                        {
                          id: "soft_drinks",
                          label: "Soft drinks (e.g., juice, soda)",
                        },
                        { id: "coffee_tea", label: "Coffee / Tea" },
                        { id: "beer", label: "Beer" },
                        { id: "wine", label: "Wine" },
                        { id: "cocktails", label: "Cocktails" },
                        {
                          id: "non_alcoholic_only",
                          label: "Non-alcoholic options only",
                        },
                      ].map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="drinkPreferences"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="drinkRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Any drink-related restrictions or preferences?
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Optional" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Workshop Participation */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">
                  Workshop Participation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Please rank the following workshops in order of interest for
                  attendance on Saturday 18th. Assign a rank from 1 (most
                  preferred) to 3 (least preferred).
                </p>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="workshopPreferences.disasterManagement"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-2">
                          <FormLabel className="text-base font-medium">
                            Geospatial data for disaster management and climate
                            resilience (Andrés Felipe Ramirez)
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            This workshop explores how geospatial technologies
                            data supports urban resilience and disaster
                            response. Participants will engage with real-world
                            examples and learn about data integration, open
                            platforms and challenges in data accessibility.
                          </p>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number.parseInt(value))
                              }
                              defaultValue={field.value?.toString()}
                            >
                              <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select rank" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">
                                  1 (Most preferred)
                                </SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">
                                  3 (Least preferred)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workshopPreferences.digitalTwins"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-2">
                          <FormLabel className="text-base font-medium">
                            Introduction to digital twins for smart cities
                            (Nicolas Luna)
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            This workshop presents two approaches to building
                            digital twins using proprietary and open-source
                            tools. Participants will explore workflows with
                            ArcGIS and compare them with an open-source pipeline
                            using PostGIS, Geoserver, and Cesium for 3D web
                            visualization.
                          </p>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number.parseInt(value))
                              }
                              defaultValue={field.value?.toString()}
                            >
                              <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select rank" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">
                                  1 (Most preferred)
                                </SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">
                                  3 (Least preferred)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workshopPreferences.participatoryMapping"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-2">
                          <FormLabel className="text-base font-medium">
                            Participatory mapping for smarter cities (Candela
                            Sol Pelliza)
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            This workshop explores how participatory mapping can
                            support smarter, more inclusive cities by empowering
                            communities and informing policy. Participants will
                            learn key practices, tools, and real-world
                            applications, with a demo showcasing its use in
                            urban planning.
                          </p>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number.parseInt(value))
                              }
                              defaultValue={field.value?.toString()}
                            >
                              <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select rank" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">
                                  1 (Most preferred)
                                </SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">
                                  3 (Least preferred)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  <a href="#" className="text-blue-600 hover:underline">
                    See more details about the workshops here
                  </a>
                </p>
              </div>

              {/* Travel & Accommodation */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">
                  Travel & Accommodation
                </h3>

                <FormField
                  control={form.control}
                  name="needsAccommodationHelp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Do you need help or information regarding
                          accommodation in Lisbon?
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Communication & Consent */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">
                  Communication & Consent
                </h3>

                <FormField
                  control={form.control}
                  name="joinWhatsApp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Would you like to join the GeoMundus WhatsApp group for
                        updates? *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(value === "yes")
                          }
                          defaultValue={field.value ? "yes" : "no"}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="whatsapp_yes" />
                            <Label htmlFor="whatsapp_yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="whatsapp_no" />
                            <Label htmlFor="whatsapp_no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consentPublicList"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Do you consent for your name and affiliation to be
                        included in the public participants list? *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(value === "yes")
                          }
                          defaultValue={field.value ? "yes" : "no"}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="public_list_yes" />
                            <Label htmlFor="public_list_yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="public_list_no" />
                            <Label htmlFor="public_list_no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consentPhotography"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Do you consent to be photographed or recorded during the
                        event for promotional and archival purposes? *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(value === "yes")
                          }
                          defaultValue={field.value ? "yes" : "no"}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="photo_yes" />
                            <Label htmlFor="photo_yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="photo_no" />
                            <Label htmlFor="photo_no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">
                  Additional Information
                </h3>

                <FormField
                  control={form.control}
                  name="howDidYouHear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How did you hear about GeoMundus 2025?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="university"
                              id="hear_university"
                            />
                            <Label htmlFor="hear_university">University</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="social_media"
                              id="social_media"
                            />
                            <Label htmlFor="social_media">Social Media</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="friend_colleague"
                              id="friend_colleague"
                            />
                            <Label htmlFor="friend_colleague">
                              Friend / Colleague
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="website" id="hear_website" />
                            <Label htmlFor="hear_website">
                              GeoMundus Website
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="hear_other" />
                            <Label htmlFor="hear_other">Other</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchHowDidYouHear === "other" && (
                  <FormField
                    control={form.control}
                    name="howDidYouHearOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Please specify how you heard about us
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="How did you hear about GeoMundus 2025?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="additionalComments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Any comments, requests, or special needs?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Optional - Please share any additional information, special requirements, or comments"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? "Submitting Registration..."
                  : "Submit Registration"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
