import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Float "mo:base/Float";
import Array "mo:base/Array";


actor DBank{
  stable var currentValue: Float = 300;
  currentValue := 300;
  Debug.print(debug_show(currentValue));

  stable var startTime = Time.now();
  startTime := Time.now();
  Debug.print(debug_show(startTime));

  public func topUp(amount : Float){
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdrawal (debit: Float){
    let tempValue: Float = currentValue-debit;
    if(tempValue>=0){
    currentValue -= debit;
    Debug.print(debug_show(currentValue));
    }else{
      Debug.print("Amount is too large, current value is less than zero")
    }
  };

  public query func checkBalance(): async Float{
    return currentValue;
  };

  public func compound(){
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.01**Float.fromInt(timeElapsedS));
    startTime := currentTime;
  };
}