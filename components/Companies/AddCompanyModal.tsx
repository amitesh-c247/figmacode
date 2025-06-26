import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { FormField } from "../ui/form-field";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { companySchema, type CompanyFormData } from "../../lib/validationSchemas";

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCompanyModal({ isOpen, onClose }: AddCompanyModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<CompanyFormData>({
    resolver: yupResolver(companySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      industry: "",
      description: "",
      status: "active",
      logo: undefined,
    },
  });

  const watchedStatus = watch("status");

  if (!isOpen) return null;

  const onSubmit = async (data: CompanyFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Company data:", data);
    setIsLoading(false);
    reset();
    setLogoPreview(null);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("logo", file, { shouldValidate: true });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    reset();
    setLogoPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-purple-600 text-white px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Add Company</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:bg-purple-700"
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6 space-y-6">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Company's Logo</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                {logoPreview ? (
                  <div className="space-y-4">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="w-24 h-24 object-cover rounded-full mx-auto"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setLogoPreview(null);
                        setValue("logo", undefined);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload LOGO
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-500">Supported file formats: JPEG, PNG, GIF, JPG (Max 5MB)</p>
              {errors.logo && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.logo.message}
                </p>
              )}
            </div>

            {/* Company Name and Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Company Name"
                placeholder="Enter company name"
                required
                error={errors.name?.message}
                {...register("name")}
              />
              <FormField
                label="Industry"
                placeholder="Enter industry"
                error={errors.industry?.message}
                {...register("industry")}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Type your description here..."
                rows={4}
                className={`resize-none ${errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                {...register("description")}
              />
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Word Limit: 300 words</p>
                {errors.description && (
                  <p className="text-xs text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2 max-w-xs">
              <Label>
                Status <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={watchedStatus} 
                onValueChange={(value) => setValue("status", value as "active" | "inactive" | "pending", { shouldValidate: true })}
              >
                <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.status.message}
                </p>
              )}
            </div>
          </CardContent>

          {/* Footer */}
          <div className="bg-purple-25 px-6 py-4 rounded-b-lg">
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700"
                disabled={!isValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}