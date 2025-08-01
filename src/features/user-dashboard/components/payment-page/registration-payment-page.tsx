"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "stripe",
    name: "Credit/Debit Cards",
    description: "Pay with credit/debit cards",
    icon: "💳",
    enabled: true,
  },
];

export default function StripeCheckout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    email: "john.smith@drukglobal.com",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    country: "US",
    zipCode: "",
  });
  //   const [saveCard, setSaveCard] = useState(false);

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);
    }, 3000);
  };

  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-green-900 mb-2">
                Payment successful
              </h1>
              <p className="text-green-700 mb-4">
                Your payment of $2,000.00 has been processed.
              </p>
              <div className="bg-white p-4 rounded-lg border border-green-200 mb-6">
                <p className="text-sm text-gray-600 mb-1">
                  Payment confirmation
                </p>
                <p className="font-mono text-sm font-semibold">
                  #pi_3OqIC92eZvKYlo2C0XhWwvUb
                </p>
              </div>
              <Button className="w-full">Continue to Dashboard</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
          {/* Left Panel - Payment Methods */}
          <div className="lg:col-span-3 p-6 lg:p-12">
            <div className="max-w-lg mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">S</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    Corporate Services
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Choose How You&lsquio;d Like to Pay
                </h1>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 mb-8">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-gray-300 ${
                      selectedPaymentMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{method.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Image
                          src="/placeholder.svg?height=24&width=40&text=VISA"
                          alt="Visa"
                          width={40}
                          height={24}
                          className="h-6 w-10 object-contain"
                        />
                        <Image
                          src="/placeholder.svg?height=24&width=40&text=MC"
                          alt="Mastercard"
                          width={40}
                          height={24}
                          className="h-6 w-10 object-contain"
                        />
                        <Image
                          src="/placeholder.svg?height=24&width=40&text=AMEX"
                          alt="American Express"
                          width={40}
                          height={24}
                          className="h-6 w-10 object-contain"
                        />
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Form */}
              {selectedPaymentMethod === "stripe" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={cardDetails.email}
                        onChange={(e) =>
                          setCardDetails((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="mt-1"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="cardNumber"
                        className="text-sm font-medium text-gray-700"
                      >
                        Card information
                      </Label>
                      <div className="mt-1 space-y-0">
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            placeholder="1234 1234 1234 1234"
                            value={cardDetails.cardNumber}
                            onChange={(e) =>
                              setCardDetails((prev) => ({
                                ...prev,
                                cardNumber: e.target.value,
                              }))
                            }
                            className="rounded-b-none border-b-0"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                            <Image
                              src="/placeholder.svg?height=20&width=32&text=VISA"
                              alt="Visa"
                              className="h-5 w-8 object-contain"
                            />
                            <Image
                              src="/placeholder.svg?height=20&width=32&text=MC"
                              alt="Mastercard"
                              className="h-5 w-8 object-contain"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <Input
                            placeholder="MM / YY"
                            value={cardDetails.expiryDate}
                            onChange={(e) =>
                              setCardDetails((prev) => ({
                                ...prev,
                                expiryDate: e.target.value,
                              }))
                            }
                            className="rounded-none rounded-bl-md border-r-0"
                          />
                          <Input
                            placeholder="CVC"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails((prev) => ({
                                ...prev,
                                cvv: e.target.value,
                              }))
                            }
                            className="rounded-none rounded-br-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="cardholderName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Cardholder name
                      </Label>
                      <Input
                        id="cardholderName"
                        placeholder="Full name on card"
                        value={cardDetails.cardholderName}
                        onChange={(e) =>
                          setCardDetails((prev) => ({
                            ...prev,
                            cardholderName: e.target.value,
                          }))
                        }
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="country"
                          className="text-sm font-medium text-gray-700"
                        >
                          Country or region
                        </Label>
                        <Select
                          value={cardDetails.country}
                          onValueChange={(value) =>
                            setCardDetails((prev) => ({
                              ...prev,
                              country: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">🇺🇸 United States</SelectItem>
                            <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                            <SelectItem value="GB">
                              🇬🇧 United Kingdom
                            </SelectItem>
                            <SelectItem value="AU">🇦🇺 Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label
                          htmlFor="zipCode"
                          className="text-sm font-medium text-gray-700"
                        >
                          ZIP
                        </Label>
                        <Input
                          id="zipCode"
                          placeholder="12345"
                          value={cardDetails.zipCode}
                          onChange={(e) =>
                            setCardDetails((prev) => ({
                              ...prev,
                              zipCode: e.target.value,
                            }))
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="saveCard" />
                      <Label
                        htmlFor="saveCard"
                        className="text-sm text-gray-700"
                      >
                        Securely save my information for 1-click checkout
                      </Label>
                    </div>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Pay $2,000.00
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="h-4 w-4" />
                      <span>Powered by Stripe</span>
                    </div>
                    <p>
                      Your payment information is encrypted and secure. By
                      continuing, you agree to our{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}

              {!selectedPaymentMethod && (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Select a payment method to continue
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Payment Summary */}
          <div className="lg:col-span-2 bg-gray-50 p-6 lg:p-12 border-l border-gray-200">
            <div className="sticky top-12">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Payment Summary
                </h2>

                {!selectedPaymentMethod && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800 text-sm font-medium">
                      Payment method not selected
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Company Registration
                      </h3>
                      <p className="text-sm text-gray-600">
                        Complete business setup package
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Company Registration Service
                      </span>
                      <span className="font-medium">$1,500.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Registered Agent (1 Year)
                      </span>
                      <span className="font-medium">$300.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">EIN Application</span>
                      <span className="font-medium">$150.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Corporate Kit & Seal
                      </span>
                      <span className="font-medium">$50.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-lg">$2,000.00</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-3 w-3" />
                      <span>256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>PCI DSS compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-3 w-3" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p className="mb-2">
                  <strong>Need help?</strong>
                </p>
                <p>
                  Contact our support team at support@corporateservices.com or
                  call +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
