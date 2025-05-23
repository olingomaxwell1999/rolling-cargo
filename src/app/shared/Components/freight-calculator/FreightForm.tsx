"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FreightFormProps } from "@/types/feright.types";

const FreightForm: React.FC<FreightFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  errors,
  freightType,
  volumetricWeight,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Weight & Dimensions */}
      {freightType === "air" && (
        <>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              value={formData.weight}
              onChange={handleChange}
            />
            {errors.weight && (
              <p className="text-red-500 text-sm">{errors.weight}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="length">Length (cm)</Label>
              <Input
                id="length"
                value={formData.length}
                onChange={handleChange}
              />
              {errors.length && (
                <p className="text-red-500 text-sm">{errors.length}</p>
              )}
            </div>
            <div>
              <Label htmlFor="width">Width (cm)</Label>
              <Input
                id="width"
                value={formData.width}
                onChange={handleChange}
              />
              {errors.width && (
                <p className="text-red-500 text-sm">{errors.width}</p>
              )}
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                value={formData.height}
                onChange={handleChange}
              />
              {errors.height && (
                <p className="text-red-500 text-sm">{errors.height}</p>
              )}
            </div>
          </div>
          {volumetricWeight !== null && (
            <div>
              <Label>Volumetric Weight (kg)</Label>
              <Input value={volumetricWeight.toFixed(2)} readOnly />
            </div>
          )}
        </>
      )}

      {/* CBM for Sea */}
      {freightType === "sea" && (
        <div>
          <Label htmlFor="cbm">CBM (Cubic Meters)</Label>
          <Input id="cbm" value={formData.cbm} onChange={handleChange} />
          {errors.cbm && <p className="text-red-500 text-sm">{errors.cbm}</p>}
        </div>
      )}

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={formData.email} onChange={handleChange} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Talk to us
      </Button>
    </form>
  );
};

export default FreightForm;
