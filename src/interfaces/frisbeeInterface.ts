interface FrisbeeInterface {
  frisbeeId?: string;
  name?: string;
  description?: string;
  price?: number;
  range?: string;
  ingredients?: [
    {
      ingredientId: string;
      weight: number;
    }
  ];
}

export default FrisbeeInterface;
