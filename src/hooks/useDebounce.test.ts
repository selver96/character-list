import { renderHook, act } from "@testing-library/react";
import useDebounce from "../hooks/useDebounce"; // Adjust path if needed

jest.useFakeTimers(); // Mock timers

describe("useDebounce Hook", () => {
  test("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  test("updates value after debounce delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "first" },
      }
    );

    // Initially, the value should be "first"
    expect(result.current).toBe("first");

    // Change value and rerender
    rerender({ value: "second" });

    // Before timeout, value should still be "first"
    expect(result.current).toBe("first");

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // After debounce, value should update
    expect(result.current).toBe("second");
  });

  test("cancels previous debounce call when value changes quickly", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "first" },
      }
    );

    rerender({ value: "second" });
    rerender({ value: "third" });

    // Fast-forward only 300ms (less than debounce delay)
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Value should still be "first" because debounce hasn't triggered yet
    expect(result.current).toBe("first");

    // Fast-forward another 300ms (total 600ms)
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Now debounce should have triggered, updating to "third"
    expect(result.current).toBe("third");
  });
});
