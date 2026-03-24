"use client"
import React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/cards"
import {
  Check,
  Star,
  BarChart3,
  Lock,
  Link as LinkIcon,
  QrCode,
  Users,
  Globe,
  Clock,
  ShieldCheck,
} from "lucide-react"

export const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for personal use",
      features: [
        { label: "Unlimited Short Links", icon: LinkIcon },
        { label: "Basic Analytics", icon: BarChart3 },
        { label: "Custom Aliases", icon: Globe },
        { label: "QR Code Generation", icon: QrCode },
      ],
      button: "Get Started",
      highlight: false,
    },
    {
      name: "Premium",
      price: "$15 Lifetime",
      originalPrice: "$30",
      description: "Best for creators & marketers",
      features: [
        { label: "Advanced Analytics", icon: BarChart3 },
        { label: "Password Protected Links", icon: Lock },
        { label: "Link Expiry Control", icon: Clock },
        { label: "UTM Tracking", icon: Globe },
        { label: "Custom Aliases", icon: Globe },
        { label: "QR Code Generation", icon: QrCode },
        { label: "Priority Support", icon: ShieldCheck },
      ],
      button: "Upgrade to Premium",
      highlight: true,
    }

  ]

  return (
    <section className="w-full max-w-5xl px-4 py-20 md:mx-auto  ">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
          Simple & Transparent Pricing
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose a plan that fits your needs. Upgrade anytime as you grow.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-stretch">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative w-full bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 transition-all duration-300
              ${plan.highlight
                ? "md:scale-105 scale-102 border-cyan-500 shadow-2xl shadow-cyan-500/20"
                : "hover:border-gray-600 hover:-translate-y-2"
              }
            `}
          >
            {/* Badge */}
            {/* Badge */}
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm rounded-full flex items-center gap-1 animate-pulse">
                🔥 50% OFF – Limited Time
              </div>
            )}


            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-100">
                {plan.name}
              </CardTitle>
              <div className="mt-3 flex flex-col items-center">
                {plan.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {plan.originalPrice}
                  </span>
                )}
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {plan.price}
                </div>
                {plan.highlight && (
                  <p className="text-xs text-gray-400 mt-1">
                    Lifetime deal • 50% off for limited time
                  </p>
                )}
              </div>
              <p className="text-gray-400 mt-2">{plan.description}</p>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <Icon className="text-cyan-400 w-5 h-5" />
                      <span>{feature.label}</span>
                    </li>
                  )
                })}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300
                  ${plan.highlight
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/40  cursor-pointer"
                    : "bg-gray-800 text-gray-200 hover:bg-gray-700 cursor-pointer mt-8"
                  }
                `}
              ><Link href={plan.highlight ? "/pricing" : "/sign-up-to-trimify"}>
                  {plan.button}</Link>
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
