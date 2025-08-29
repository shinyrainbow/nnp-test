"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Trash2,
  Home,
  Eye,
  FileText,
  Save,
  Edit,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { t } from "i18next";
import { useLanguage } from "@/contexts/language-context";

interface PropertyTemplate {
  id: string;
  name: string;
  format: string;
}

interface TemplateField {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "multiselect" | "textarea";
  placeholder?: string;
  options?: string[];
  emoji?: string;
  required: boolean;
}

const defaultFields: TemplateField[] = [
  {
    id: "projectName",
    label: "Project Name",
    type: "text",
    emoji: "🏠",
    required: true,
  },
  {
    id: "roomNumber",
    label: "Room Number",
    type: "text",
    emoji: "",
    required: false,
  },
  {
    id: "location",
    label: "Location",
    type: "textarea",
    emoji: "📍",
    required: true,
  },
  {
    id: "roomType",
    label: "Property Type",
    type: "select",
    emoji: "🏢",
    options: ["Condo", "House", "Townhouse", "Apartment"],
    required: true,
  },
  {
    id: "roomSize",
    label: "Size (sqm)",
    type: "number",
    emoji: "📐",
    required: true,
  },
  {
    id: "bedRoom",
    label: "Bedrooms",
    type: "number",
    emoji: "🛏️",
    required: true,
  },
  {
    id: "bathRoom",
    label: "Bathrooms",
    type: "number",
    emoji: "🚿",
    required: true,
  },
  {
    id: "carPark",
    label: "Parking Spaces",
    type: "number",
    emoji: "🚗",
    required: false,
  },
  {
    id: "rentalRate",
    label: "Rental Rate",
    type: "number",
    emoji: "💰",
    required: false,
  },
  {
    id: "sellPrice",
    label: "Sale Price",
    type: "number",
    emoji: "💵",
    required: false,
  },
  { id: "phone", label: "Phone", type: "text", emoji: "📱", required: true },
  {
    id: "lineId",
    label: "Line ID",
    type: "text",
    emoji: "💬",
    required: false,
  },
];

const mockPropertyData = {
  projectName: "Luxury Condo Central",
  roomNumber: "A-1205",
  location:
    "Sukhumvit Road, Bangkok\nNear BTS Asok Station\nClose to Terminal 21 Shopping Mall",
  roomType: "Condo",
  roomSize: "45",
  bedRoom: "1",
  bathRoom: "1",
  carPark: "1",
  rentalRate: "25000",
  sellPrice: "4500000",
  phone: "081-234-5678",
  lineId: "@propertybkk",
};

export default function PropertyPostCreator() {
  const [templates, setTemplates] = useState<PropertyTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<PropertyTemplate | null>(null);
  const [propertyData, setPropertyData] =
    useState<Record<string, any>>(mockPropertyData);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();
  const [copiedStates, setCopiedStates] = useState(false);
  useEffect(() => {
    loadTemplates();
  }, []);
  const [template, setTemplate] = useState("");

  const loadTemplates = async () => {
    try {
      const response = await fetch("/api/post-builder");
      const data = await response.json();

      if (response.ok) {
        setTemplate(data.template);
        // if (data.templates.length > 0 && !selectedTemplate) {
        //   setSelectedTemplate(data.templates[0]);
        // }
      } else {
        toast({
          title: "Failed to load templates",
          description: data.error || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to load templates",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const generatePost = () => {
    if (!template) return "";

    let post = template;
    // selectedTemplate.format;

    defaultFields.forEach((field) => {
      const value = propertyData[field.id] || "";
      const emoji = field.emoji || "";

      post = post.replace(new RegExp(`{${field.id}}`, "g"), value);
      post = post.replace(new RegExp(`{emoji:${field.id}}`, "g"), emoji);
    });

    return post;
  };

  const copyToClipboard = async () => {
    const post = generatePost();
    // console.log(post, 666666);
    try {
      await navigator.clipboard.writeText(post);
      console.log("helloooooo");
      setCopiedStates(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates(false);
      }, 2000);
      toast({
        title: "Copied to clipboard!",
        description: "Your property post has been copied successfully.",
      });
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = post;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast({
          title: "Copied to clipboard!",
          description: "Your property post has been copied successfully.",
        });
      } catch (fallbackErr) {
        toast({
          title: "Failed to copy",
          description: "Please manually select and copy the text.",
          variant: "destructive",
        });
      }
      document.body.removeChild(textArea);
    }
  };

  const saveTemplate = async () => {
    try {
      const response = await fetch("/api/post-builder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Main template",
          format: template,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // setTemplates([...templates, data.template]);
        // setSelectedTemplate(data.template);
        // setNewTemplateName("");

        toast({
          title: "Template saved!",
          description: `Template "${data.template.name}" has been saved successfully.`,
        });
      } else {
        toast({
          title: "Failed to save template",
          description: data.error || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to save template",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  // const saveNewTemplate = async () => {
  //   if (!newTemplateName.trim() || !selectedTemplate?.format.trim()) {
  //     toast({
  //       title: "Missing information",
  //       description: "Please enter a template name and format.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/api/message-templates", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: newTemplateName.trim(),
  //         format: selectedTemplate.format,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setTemplates([...templates, data.template]);
  //       setSelectedTemplate(data.template);
  //       setNewTemplateName("");

  //       toast({
  //         title: "Template saved!",
  //         description: `Template "${data.template.name}" has been saved successfully.`,
  //       });
  //     } else {
  //       toast({
  //         title: "Failed to save template",
  //         description: data.error || "Please try again.",
  //         variant: "destructive",
  //       });
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Failed to save template",
  //       description: "Please check your connection and try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  // const updateTemplateName = async (templateId: string, newName: string) => {
  //   try {
  //     const response = await fetch(`/api/message-templates/${templateId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: newName,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       const updatedTemplates = templates.map((t) =>
  //         t.id === templateId ? data.template : t
  //       );
  //       setTemplates(updatedTemplates);

  //       if (selectedTemplate?.id === templateId) {
  //         setSelectedTemplate(data.template);
  //       }

  //       setIsEditingName(false);
  //       toast({
  //         title: "Template renamed!",
  //         description: "Template name has been updated successfully.",
  //       });
  //     } else {
  //       toast({
  //         title: "Failed to update template",
  //         description: data.error || "Please try again.",
  //         variant: "destructive",
  //       });
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Failed to update template",
  //       description: "Please check your connection and try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  // const deleteTemplate = async (templateId: string) => {
  //   if (templates.length === 1) {
  //     toast({
  //       title: "Cannot delete",
  //       description: "You must have at least one template.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`/api/message-templates/${templateId}`, {
  //       method: "DELETE",
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       const updatedTemplates = templates.filter((t) => t.id !== templateId);
  //       setTemplates(updatedTemplates);

  //       if (selectedTemplate?.id === templateId) {
  //         setSelectedTemplate(updatedTemplates[0]);
  //       }

  //       toast({
  //         title: "Template deleted!",
  //         description: "Template has been removed successfully.",
  //       });
  //     } else {
  //       toast({
  //         title: "Failed to delete template",
  //         description: data.error || "Please try again.",
  //         variant: "destructive",
  //       });
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Failed to delete template",
  //       description: "Please check your connection and try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const updateTemplateFormatDebounced = async (format: string) => {
    // if (!template) return;

    console.log('jjjjjjjjj')
    // Update local state immediately for better UX
    // const updatedTemplate = {
    //   ...template,
    //   format,
    // };
    setTemplate(format);
    // setSelectedTemplate(updatedTemplate);

    // setTemplates(
    //   templates.map((t) => (t.id === selectedTemplate.id ? updatedTemplate : t))
    // );

    // Debounce API call to avoid too many requests
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(async () => {
      try {
        await fetch(`/api/post-builder`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            format: template,
          }),
        });
      } catch (error) {
        // Silent fail for format updates to avoid interrupting user typing
        console.error("Failed to save template format:", error);
      }
    }, 1000);
  };

  const loadMockData = () => {
    setPropertyData(mockPropertyData);
    toast({
      title: "Mock data loaded!",
      description: "Sample property data has been loaded for testing.",
    });
  };

  const insertFieldTag = (fieldId: string, isEmoji = false) => {
    if (!template || !textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    // const currentFormat = selectedTemplate.format;

    const currentFormat = template;
    const tagToInsert = isEmoji ? `{emoji:${fieldId}}` : `{${fieldId}}`;
    const newFormat =
      currentFormat.slice(0, start) + tagToInsert + currentFormat.slice(end);

    updateTemplateFormatDebounced(newFormat);

    // Set cursor position after the inserted tag
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + tagToInsert.length,
        start + tagToInsert.length
      );
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                {t("post.title")}
              </h1>
            </div>
            <Badge variant="secondary">{t("post.badge")}</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  My Templates
                </CardTitle>
                <CardDescription>Manage your saved message templates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center gap-2 p-3 border rounded-lg">
                      <div className="flex-1">
                        {isEditingName && selectedTemplate?.id === template.id ? (
                          <Input
                            value={template.name}
                            onChange={(e) => {
                              const updatedTemplates = templates.map((t) =>
                                t.id === template.id ? { ...t, name: e.target.value } : t,
                              )
                              setTemplates(updatedTemplates)
                              if (selectedTemplate?.id === template.id) {
                                setSelectedTemplate({ ...selectedTemplate, name: e.target.value })
                              }
                            }}
                            onBlur={() => setIsEditingName(false)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setIsEditingName(false)
                              }
                            }}
                            autoFocus
                          />
                        ) : (
                          <span
                            className={`font-medium cursor-pointer ${
                              selectedTemplate?.id === template.id ? "text-primary" : ""
                            }`}
                            onClick={() => setSelectedTemplate(template)}
                          >
                            {template.name}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTemplate(template)
                          setIsEditingName(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTemplate(template.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="New template name..."
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                  />
                  <Button onClick={saveNewTemplate} variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card> */}

            {/* Edit part */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t("post.formatEditor")}
                </CardTitle>
                <CardDescription>{t("post.formatEditorDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="format">{t("post.postFormatTemplate")}</Label>
                  <Textarea
                    ref={textareaRef}
                    id="format"
                    value={template || ""}
                    onChange={(e) =>
                      updateTemplateFormatDebounced(e.target.value)
                    }
                    placeholder="Enter your custom format here..."
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-2 text-sm">
                      {t("post.fieldTags")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {defaultFields.map((field) => (
                        <Button
                          key={field.id}
                          variant="outline"
                          size="sm"
                          onClick={() => insertFieldTag(field.id)}
                          className="text-xs h-7 px-2 hover:bg-primary hover:text-primary-foreground"
                        >
                          {/* {field.emoji} */}
                          {`{${field.id}}`}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2 text-sm">
                      {t("post.emojiTags")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {defaultFields
                        .filter((field) => field.emoji)
                        .map((field) => (
                          <Button
                            key={`emoji-${field.id}`}
                            variant="outline"
                            size="sm"
                            onClick={() => insertFieldTag(field.id, true)}
                            className="text-xs h-7 px-2 hover:bg-secondary hover:text-secondary-foreground"
                          >
                            {field.emoji}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>

                <Button onClick={saveTemplate} className="w-full">
                  Save template
                </Button>
              </CardContent>
            </Card>

            {/* Property Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  {t("post.propertyData")}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center justify-between">
                    <span>{t("post.propertyDataDesc")}</span>
                    <Button onClick={loadMockData} variant="outline" size="sm">
                      {t("post.loadData")}
                    </Button>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto">
                  {defaultFields.map((field) => (
                    <div key={field.id}>
                      <Label
                        htmlFor={field.id}
                        className="flex items-center gap-2"
                      >
                        {field.emoji} {field.label}
                        {field.required && (
                          <span className="text-destructive">*</span>
                        )}
                      </Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          id={field.id}
                          value={propertyData[field.id] || ""}
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              [field.id]: e.target.value,
                            })
                          }
                          placeholder={field.placeholder}
                        />
                      ) : field.type === "select" ? (
                        <Select
                          value={propertyData[field.id] || ""}
                          onValueChange={(value) =>
                            setPropertyData({
                              ...propertyData,
                              [field.id]: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`Select ${field.label}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={field.id}
                          type={field.type}
                          value={propertyData[field.id] || ""}
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              [field.id]: e.target.value,
                            })
                          }
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {t("post.generatePreview")}
                </CardTitle>
                <CardDescription>{t("post.review")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg min-h-[300px]">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {generatePost() ||
                      "Create your format template to see the preview..."}
                  </pre>
                </div>
                <Button
                  onClick={copyToClipboard}
                  className="w-full"
                  disabled={!generatePost()}
                >
                  {copiedStates ? (
                    <Check className="w-4 h-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copiedStates ? t("post.copied") : t("post.copy")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
